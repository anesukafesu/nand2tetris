import process from "process";
import { basename } from "path";
import { parseFile, writeInstructionsToFile } from "./lib/io.js";
import { translate } from "./lib/translate.js";

async function main() {
  const sourceFilePath = process.argv[2];
  const baseName = basename(sourceFilePath).split(".")[0];
  const assemblyFilePath = sourceFilePath.replace(".vm", ".asm");

  const VMCode = await parseFile(sourceFilePath);
  const assemblyInstructions = VMCode.map((instruction) =>
    translate(instruction, baseName)
  );
  await writeInstructionsToFile(assemblyInstructions, assemblyFilePath);
}

main();
