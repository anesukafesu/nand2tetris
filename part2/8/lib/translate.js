import { basename } from "path";
import { parseFile } from "./io.js";

const segmentMap = {
  local: "LCL",
  argument: "ARG",
  this: "THIS",
  that: "THAT",
};

/**
 * Reads code from a file and translates it
 * @param {string} sourceFilePath The file path to the source file
 * @returns {Promise<string[]>} The code from the file translated
 */
export async function translateVMFile(sourceFilePath) {
  const baseName = basename(sourceFilePath).split(".")[0];
  const VMCode = await parseFile(sourceFilePath);
  const assemblyCode = translateVMCode(VMCode, baseName);
  return assemblyCode;
}

/**
 * Translates several instructions, normally in a single VM file, into Hack assembly code
 * @param {string[]} VMCode The Virtual Machine Code to translate
 * @param {string} sourceFileBaseName The base name of the source file
 * @returns {string[]} The translated code
 */
function translateVMCode(VMCode, sourceFileBaseName) {
  let currentFunction = "";

  const assemblyInstructions = VMCode.map((instruction, index) => {
    const { assemblyCode, functionName } = translateVMInstruction(
      instruction,
      sourceFileBaseName,
      currentFunction,
      index
    );

    currentFunction = functionName;
    return assemblyCode;
  });

  return assemblyInstructions;
}

/**
 * Translates a single VM instruction into its assembly language equivalent.
 * @param {string} instruction The instruction to translate.
 * @param {string} fileBaseName The base name of the file currently being translated
 * @param {string} functionName The name of the function that is currently being translated
 * @param {number} instructionNumber The number of the instruction being translated
 * @returns {{ assemblyCode: string, functionName: string }} An object containing the assembly
 * code and the function that is currently being translated.
 */

function translateVMInstruction(
  instruction,
  fileBaseName,
  functionName,
  instructionNumber
) {
  const words = instruction.split(" ");
  let result = `// ${instruction}`;

  switch (words[0]) {
    case "label": {
      // label __
      // label bar inside function foo becomes foo$bar
      const label = words[1];
      result += `
      (${functionName}$${label})
      `;
      break;
    }

    case "goto": {
      // goto __
      const label = words[1];
      result += `
      @${functionName}$${label}
      0;JMP
      `;
      break;
    }

    case "if-goto": {
      // if-goto __
      const label = words[1];
      result += `
      @SP
      AM=M-1
      D=M
      @${functionName}$${label}
      D;JGT
      `;
      break;
    }

    case "call": {
      // call __ __
      const functionToBeCalled = words[1];
      const nArgs = words[2];

      result += `
        @${functionName}$ret.${instructionNumber}
        D=A
        @SP
        A=M
        M=D
        @SP
        M=M+1
        @LCL
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
        @ARG
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
        @THIS
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
        @THAT
        D=M
        @SP
        A=M
        M=D
        @SP
        M=M+1
        @SP
        D=M
        @5
        D=D-A
        @${nArgs}
        D=D-A
        @ARG
        M=D
        @SP
        D=M
        @LCL
        M=D
        @${functionToBeCalled}
        0;JMP
        (${functionName}$ret.${instructionNumber})
      `;
      break;
    }

    case "function": {
      // function __ __
      functionName = words[1];
      const nLocal = words[2];
      result += `
      (${functionName})
      `;
      for (let i = 0; i < Number(nLocal); i++) {
        result += `
          @SP
          A=M
          M=0
          @SP
          M=M+1
        `;
      }
      break;
    }

    case "return": {
      result += `
        // r13 = arg1 this where the stack will go
        @ARG
        D=M+1
        @R13
        M=D

        // copy return address to r14
        @LCL
        D=M
        @5
        D=D-A
        A=D
        D=M
        @R14
        M=D

        // arg0 = top of the stack
        @SP
        A=M-1
        D=M
        @ARG
        A=M
        M=D

        // move sp to lcl
        @LCL
        D=M
        @SP
        M=D

        // that = stack.pop()
        @SP
        AM=M-1
        D=M
        @THAT
        M=D

        // this = stack.pop()
        @SP
        AM=M-1
        D=M
        @THIS
        M=D

        // arg = stack.pop()
        @SP
        AM=M-1
        D=M
        @ARG
        M=D

        // lcl = stack.pop()
        @SP
        AM=M-1
        D=M
        @LCL
        M=D

        // SP = R13
        @R13
        D=M
        @SP
        M=D

        // jump to *R14
        @R14
        A=M
        0;JMP
      `;
      break;
    }

    case "push": {
      // push __ __
      const segment = words[1];
      const index = Number(words[2]);
      switch (segment) {
        case "local": // push local __
        case "argument": // push argument __
        case "this": // push this __
        case "that": {
          // push that __
          const segmentBaseAddressKeyword = segmentMap[segment];
          result += `
            @${segmentBaseAddressKeyword}
            D=M
            @${index}
            A=D+A
            D=M
            @SP
            A=M
            M=D
            @SP
            M=M+1
          `;
          break;
        }
        case "temp": // push temp __
        case "pointer": {
          // push pointer __
          const baseAddress = segment == "pointer" ? 3 : 5;
          const finalAddress = baseAddress + index;
          result += `
            @${finalAddress}
            D=M
            @SP
            A=M
            M=D
            @SP
            M=M+1
          `;
          break;
        }
        case "constant": {
          // push constant __
          const constant = words[2];
          result += `
            @${constant}
            D=A
            @SP
            A=M
            M=D
            @SP
            M=M+1
          `;
          break;
        }
        case "static": {
          const symbol = `${fileBaseName}.${index}`;
          result += `
            @${symbol}
            D=M
            @SP
            A=M
            M=D
            @SP
            M=M+1
          `;
          break;
        }
        default: {
          throw Error("Unknown memory segment:", segment);
        }
      }
      break;
    }
    case "pop": {
      // pop __ __
      // Pop with no arguments will simply push the topmost item off the stack
      if (words.length == 1) {
        result += `
        @SP
        M=M-1
        `;
        break;
      }

      // Pop has been called with arguments
      const segment = words[1];
      const index = Number(words[2]);

      switch (segment) {
        case "local": // pop local __
        case "argument": // pop argument __
        case "this": // pop this __
        case "that": {
          // pop that __
          const segmentBaseAddressKeyword = segmentMap[segment];
          result += `
            @${segmentBaseAddressKeyword}
            D=M
            @${index}
            D=D+A
            @R13
            M=D
            @SP
            AM=M-1
            D=M
            @R13
            A=M
            M=D
          `;
          break;
        }
        case "temp":
        case "pointer": {
          const baseAddress = segment == "pointer" ? 3 : 5;
          const finalAddress = baseAddress + index;
          result += `
            @SP
            AM=M-1
            D=M
            @${finalAddress}
            M=D
          `;
          break;
        }
        case "static": {
          const symbol = `${fileBaseName}.${index}`;
          result += `
            @SP
            AM=M-1
            D=M
            @${symbol}
            M=D
          `;
          break;
        }
        case "constant": {
          throw Error("Constant is not a valid segment for the pop operation.");
        }
        default: {
          throw Error("Unknown segment:", segment);
        }
      }
      break;
    }
    case "add": {
      // add
      result += `
      @SP
      AM=M-1
      A=A-1
      D=M
      A=A+1
      D=D+M
      A=A-1
      M=D      
      `;
      break;
    }
    case "sub": {
      // sub
      result += `
      @SP
      AM=M-1
      A=A-1
      D=M
      A=A+1
      D=D-M
      A=A-1
      M=D
      `;
      break;
    }
    case "neg": {
      // neg
      result += `
      @SP
      A=M-1
      M=-M
      `;
      break;
    }
    case "eq": {
      // eq
      result += `
        @SP
        AM=M-1
        D=M
        A=A-1
        D=M-D
        @TRUE_EQ_${fileBaseName}_${instructionNumber}
        D;JEQ
        @SP
        A=M-1
        M=0
        @END_EQ_${fileBaseName}_${instructionNumber}
        0;JMP
        (TRUE_EQ_${fileBaseName}_${instructionNumber})
        @SP
        A=M-1
        M=-1
        (END_EQ_${fileBaseName}_${instructionNumber})
        `;
      break;
    }
    case "gt": {
      //gt
      result += `
        @SP
        AM=M-1
        D=M
        A=A-1
        D=M-D
        @TRUE_GT_${fileBaseName}_${instructionNumber}
        D;JGT
        @SP
        A=M-1
        M=0
        @END_GT_${fileBaseName}_${instructionNumber}
        0;JMP
        (TRUE_GT_${fileBaseName}_${instructionNumber})
        @SP
        A=M-1
        M=-1
        (END_GT_${fileBaseName}_${instructionNumber})
        `;
      break;
    }
    case "lt": {
      // lt
      result += `
        @SP
        AM=M-1
        D=M
        A=A-1
        D=M-D
        @TRUE_LT_${fileBaseName}_${instructionNumber}
        D;JLT
        @SP
        A=M-1
        M=0
        @END_LT_${fileBaseName}_${instructionNumber}
        0;JMP
        (TRUE_LT_${fileBaseName}_${instructionNumber})
        @SP
        A=M-1
        M=-1
        (END_LT_${fileBaseName}_${instructionNumber})
        `;
      break;
    }
    case "and": {
      result += `
      @SP
      A=M-1
      D=M
      A=A-1
      M=D&M
      @SP
      M=M-1
      `;
      break;
    }
    case "or": {
      result += `
        @SP
        A=M-1
        D=M
        A=A-1
        M=D|M
        @SP
        M=M-1
        `;
      break;
    }
    case "not": {
      result += `
        @SP
        A=M-1
        M=!M
        `;
      break;
    }
  }

  return { assemblyCode: result, functionName: functionName };
}
