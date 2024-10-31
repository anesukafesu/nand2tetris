import process from "process";
import { parseFile, writeInstructionsToFile } from "./lib/io.js";
import { translate } from "./lib/translate.js";

async function main() {
  const sourceFilePath = process.argv[2];
  const baseName = sourceFilePath.split(".")[0];
  const assemblyFilePath = `${baseName}.asm`;

  const VMCode = await parseFile(sourceFilePath);
  const assemblyInstructions = VMCode.map((instruction) =>
    translate(instruction, baseName)
  );
  await writeInstructionsToFile(assemblyInstructions, assemblyFilePath);
}

main();
