import { writeFile, readFile } from "fs/promises";

/** Writes Machine Language instructions to a file
 * @param filePath - The path of the file to which instructions will be
 * written
 * @param instructions - The instructions to be written to the file
 */
export async function writeToFile(
  filePath: string,
  instructions: string[]
): Promise<undefined> {
  await writeFile(filePath, instructions.join("\n"), "utf-8");
}

/**
 * Parses Hack Assembly code from a file. Parsing
 * includes splitting it into statements and removing
 * comments
 * @param filePath - The file path of the .asm program.
 * @returns - The list of statements parsed from the .asm program.
 */
export async function readFromFile(filePath: string): Promise<string[]> {
  // Read the file
  const text = await readFile(filePath, "utf-8");

  // Parse the file
  const parsedText = parseText(text);
  return parsedText;
}

/**
 * Parses a .asm string into statements. During parsing,
 * comments are removed and whitespace is trimmed.
 * @param {string} text - The text to parse
 * @returns {Array<string>} - The code parsed from the text
 */
function parseText(text: string): string[] {
  const lines = text.split("\n");

  // Removing the comments from the lines
  const linesWithoutComments = lines.map((line) => {
    const segments = line.split("//");
    return segments[0].trim();
  });

  // Removing empty lines
  const nonEmptyLinesWithoutComments = linesWithoutComments.filter(
    (line) => line != ""
  );

  return nonEmptyLinesWithoutComments;
}
