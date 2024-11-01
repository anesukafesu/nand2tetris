import { readFile, writeFile } from "fs/promises";

/**
 * Reads a VM code file, removes comments and blank lines, and returns the instructions read.
 * @param {string} filePath The path of the file with instructions
 * @returns {Promise<string[]>} The parsed instructions
 */
export async function parseFile(filePath) {
  const code = await readFile(filePath, "utf-8");
  return removeBlankLines(removeComments(code.split("\n")));
}

/**
 * Removes comments from a list of instructions.
 * @param {string[]} instructions The instructions from which to remove comments
 * @returns {string[]} Instructions without comments.
 */
function removeComments(instructions) {
  return instructions.map((instruction) => {
    return instruction.split("//")[0].trim();
  });
}

/**
 * Removes blank lines/empty entries from a list of instructions.
 * @param {string[]} instructions The list of instructions from which blank lines will be removed.
 * @returns {string[]} The list of instructions without blank lines.
 */
function removeBlankLines(instructions) {
  return instructions.filter((instruction) => instruction != "");
}

/**
 * Writes Assembly instructions to the specified file.
 * @param {string[]} instructions The assembly instructions to write to file
 * @param {string} filePath The path to the file in which the instructions are to be written
 * @returns {Promise<void>}
 */
export async function writeInstructionsToFile(instructions, filePath) {
  const code = instructions.reduce((prev, curr) => {
    return (
      prev +
      curr
        .split("\n")
        .map((line) => line.trim())
        .join("\n")
    );
  }, "");
  await writeFile(filePath, normalizeLineEndings(code), "utf-8");
}

/**
 * Normalises a text by ensuring consistent line endings.
 * @param {string} str The text to normalise.
 * @param {string} normalized The character to use to normalise
 * @returns {string} The normalised text
 */
function normalizeLineEndings(str, normalized = "\n") {
  return str.replace(/\r?\n/g, normalized);
}
