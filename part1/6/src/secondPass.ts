import { writeFile } from "fs/promises";
import { SymbolTable } from "./symbolTable";

// Map of Hack Assembly Jump Instructions to Binary Jump Instructions
const JumpMap = {
  undefined: "000",
  JGT: "001",
  JEQ: "010",
  JGE: "011",
  JLT: "100",
  JNE: "101",
  JLE: "110",
  JMP: "111",
};

// Map of Hack Assembly Destination Instructions to Binary Destination Instructions
const DestinationMap = {
  undefined: "000",
  M: "001",
  D: "010",
  MD: "011",
  A: "100",
  AM: "101",
  AD: "110",
  AMD: "111",
};

// Map of Hack Assembly Computations to Binary Computation Instructions
const ComputationMap = {
  "0": "0101010",
  "1": "0111111",
  "-1": "0111010",
  D: "0001100",
  A: "0110000",
  M: "1110000",
  "!D": "1001101",
  "!A": "0110001",
  "!M": "1110001",
  "-D": "1001111",
  "-A": "0110011",
  "-M": "1110011",
  "D+1": "0011111",
  "A+1": "0110111",
  "M+1": "1110111",
  "D-1": "0001110",
  "A-1": "0110010",
  "M-1": "1110010",
  "D+A": "0000010",
  "D+M": "1000010",
  "D-A": "0010011",
  "D-M": "1010011",
  "A-D": "0000111",
  "M-D": "1000111",
  "D&A": "0000000",
  "D&M": "1000000",
  "D|A": "0010101",
  "D|M": "1010101",
};

interface DestructuredCInstruction {
  cmp: string;
  dest?: string;
  jmp?: string;
}

/** Converts a Hack Assembly A instruction to Machine Language
 * @param instruction - The A instruction to assemble.
 * @param symbolTable - The programs symbol table after performing
 * the first pass.
 */
function assembleAInstruction(
  instruction: string,
  symbolTable: SymbolTable
): string {
  // Extract the symbol from the instruction by removing the @
  let symbol = instruction.substring(1);
  let symbolValue: number;

  if (symbol.match(/^[0-9]+$/)) {
    // TODO: Ensure the number can be stored with just 15-bits
    // If the symbol is a number we parse that number.
    symbolValue = Number(symbol);
  } else {
    // If it is a label, we retrieve the label from or add the lable to
    // the symbol table
    symbolValue = symbolTable.getSymbol(symbol);
    if (symbolValue == undefined) {
      symbolValue = symbolTable.addSymbol(symbol);
    }
  }

  // Convert symbol value to binary, pad it and return it
  return symbolValue.toString(2).padStart(16, "0");
}

/** Converts a Hack Assembly C-Instruction to Machine Code
 * @param instruction - The assembly instruction to be assembled.
 * @returns - The machine language instruction
 */
function assembleCInstruction(instruction: string): string {
  let { cmp, dest, jmp } = destructureCInstruction(instruction);

  dest = String(dest);
  jmp = String(jmp);

  if (!Object.keys(ComputationMap).includes(cmp)) {
    throw Error(`Unknown computation instruction: ${cmp}`);
  }

  if (!Object.keys(DestinationMap).includes(dest)) {
    throw Error(`Unknown destination instruction: ${dest}`);
  }

  if (!Object.keys(JumpMap).includes(jmp)) {
    throw Error(`Unknown jump instruction: ${jmp}`);
  }

  return `111${
    ComputationMap[cmp] + DestinationMap[String(dest)] + JumpMap[String(jmp)]
  }`;
}

/** Destructures a C instruction to extract the computation, destination
 * and jump subinstructions.
 * @param instruction - The C instruction to be destructured.
 * @returns - The destructured C instruction.
 */
function destructureCInstruction(
  instruction: string
): DestructuredCInstruction {
  let cmp: string | undefined, dest: string | undefined;
  let [rest, jmp] = instruction.split(";");

  let segments = rest.split("=");

  if (segments.length == 1) {
    cmp = segments[0];
  } else {
    dest = segments[0];
    cmp = segments[1];
  }

  return {
    cmp,
    dest,
    jmp,
  };
}

export function secondPass(
  statements: Array<string>,
  symbolTable: SymbolTable
): string[] {
  return statements.map((statement, _) => {
    if (statement.match(/@.+/)) {
      return assembleAInstruction(statement, symbolTable);
    } else {
      return assembleCInstruction(statement);
    }
  });
}
