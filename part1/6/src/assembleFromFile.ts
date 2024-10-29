import { firstPass } from "./firstPass";
import { readFromFile, writeToFile } from "./io";
import { secondPass } from "./secondPass";
import { SymbolTable } from "./symbolTable";

/** Assembles a program from file
 * @param inputFilePath - The path to the assembly program
 * @param outputFilePath - The path to the file where the machine
 * language instructions are to be written.
 */
export async function assembleFromFile(
  inputFilePath: string,
  outputFilePath: string
) {
  // Read the assembly instructions from file
  let instructions = await readFromFile(inputFilePath);

  // Construct a symbol table
  const symbolTable = new SymbolTable();

  // Perform first pass
  instructions = firstPass(instructions, symbolTable);

  // Perform second pass
  instructions = secondPass(instructions, symbolTable);

  // Write instructions to file
  writeToFile(outputFilePath, instructions);
}
