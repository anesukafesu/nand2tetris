import { randomUUID } from "crypto";

const segmentMap = {
  local: "LCL",
  argument: "ARG",
  this: "THIS",
  that: "THAT",
};

/**
 * Translates a single VM instruction into its machine language equivalent.
 * @param {string} instruction The instruction to translate.
 * @param {string} fileBaseName The base name of the file currently being translated
 * @returns {string} The assembly instructions equivalent to instruction.
 */

export function translate(instruction, fileBaseName) {
  const words = instruction.split(" ");
  let result = `// ${instruction}`;
  const uuid = randomUUID().replaceAll("-", "");

  switch (words[0]) {
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
        M=M-1
        AM=M-1
        D=M
        A=A+1
        D=D-M
        @WHEN_EQUAL_${uuid}
        D;JEQ
        @SP
        A=M
        M=0
        @SP
        M=M+1
        @END_${uuid}
        0;JMP
        (WHEN_EQUAL_${uuid})
            @SP
            A=M
            M=-1
            @SP
            M=M+1
        (END_${uuid})
        `;
      break;
    }
    case "gt": {
      //gt
      result += `
        @SP
        M=M-1
        AM=M-1
        D=M
        A=A+1
        D=D-M
        @WHEN_GREATER_${uuid}
        D;JGT
        @SP
        A=M
        M=0
        @SP
        M=M+1
        @END_${uuid}
        0;JMP
        (WHEN_GREATER_${uuid})
            @SP
            A=M
            M=-1
            @SP
            M=M+1
        (END_${uuid})
        `;
      break;
    }
    case "lt": {
      // lt
      result += `
        @SP
        M=M-1
        AM=M-1
        D=M
        A=A+1
        D=D-M
        @WHEN_LESS_${uuid}
        D;JLT
        @SP
        A=M
        M=0
        @SP
        M=M+1
        @END_${uuid}
        0;JMP
        (WHEN_LESS_${uuid})
            @SP
            A=M
            M=-1
            @SP
            M=M+1
        (END_${uuid})
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

  return result;
}
