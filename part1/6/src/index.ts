import { argv } from "process";
import { assembleFromFile } from "./assembleFromFile";

(async function () {
  const inputFilePath = argv[2];
  const outputFilePath =
    inputFilePath.split("/").at(-1).split(".")[0] + ".hack";

  await assembleFromFile(inputFilePath, outputFilePath);
})();
