import { SymbolTable } from "./symbolTable";
/**
 * Performs first pass on statements by adding all block
 * declarations to the symbol table
 * @param {Array<string>} instructions - The statements to perform the
 * first pass on.
 * @param {SymbolTable} symbolTable - The symbol table to which symbols
 * will be added.
 * @returns {string[]} - The instructions with all the declararation labels
 * removed.
 */
export function firstPass(
  instructions: string[],
  symbolTable: SymbolTable
): string[] {
  const remainingInstructions: string[] = [];
  let i = 0;

  for (const instruction of instructions) {
    if (instruction.match(/\(.*\)/)) {
      const symbolName = instruction.substring(1, instruction.length - 1);
      symbolTable.addSymbol(symbolName, i);
    } else {
      remainingInstructions.push(instruction);
      i += 1;
    }
  }

  return remainingInstructions;
}
