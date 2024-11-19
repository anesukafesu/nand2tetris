import process from "process";
import { join, basename } from "path";
import { writeInstructionsToFile, getVMFiles } from "./lib/io.js";
import { translateVMFile } from "./lib/translate.js";
import { EOL } from "os";
import { stat } from "fs/promises";

async function main() {
  const sourceCodePath = process.argv[2];
  const stats = await stat(sourceCodePath);
  let assemblyFilePath = "";

  // Generate bootstrap code
  const bootstrapCode =
    `
  @256
  D=A
  @SP
  M=D
  @Sys.init
  0;JMP
  ` + EOL;

  const assemblyInstructions = [bootstrapCode];

  if (stats.isFile()) {
    // Generate the file path
    assemblyFilePath = sourceCodePath.replace(".vm", ".asm");

    // Translate the code
    const translatedCode = await translateVMFile(sourceCodePath);

    // Add the translated code to the list of instructions
    assemblyInstructions.push(...translatedCode);
  } else {
    // Generate the file path
    assemblyFilePath = join(sourceCodePath, basename(sourceCodePath) + ".asm");

    // Get the names of all VM files in the directory
    const fileNames = await getVMFiles(sourceCodePath);

    // Translate all VM files in directory
    const translatedVMFiles = (
      await Promise.all(
        fileNames.map(async (fileName) => {
          const sourceFilePath = join(sourceCodePath, fileName);
          const translatedCode = await translateVMFile(sourceFilePath);
          return translatedCode;
        })
      )
    ).reduce((curr, prev) => {
      prev.push(...curr);
      return prev;
    });

    // Add the translated code to the instructions
    assemblyInstructions.push(...translatedVMFiles);
  }

  await writeInstructionsToFile(assemblyInstructions, assemblyFilePath);
}

main();
