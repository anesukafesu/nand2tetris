// function SimpleFunction.test 2
(SimpleFunction.test)

@SP
A=M
M=0
@SP
M=M+1

@SP
A=M
M=0
@SP
M=M+1

// push local 0
@LCL
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push local 1
@LCL
D=M
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
A=A-1
D=M
A=A+1
D=D+M
A=A-1
M=D

// not
@SP
A=M-1
M=!M

// push argument 0
@ARG
D=M
@0
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// add
@SP
AM=M-1
A=A-1
D=M
A=A+1
D=D+M
A=A-1
M=D

// push argument 1
@ARG
D=M
@1
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// sub
@SP
AM=M-1
A=A-1
D=M
A=A+1
D=D-M
A=A-1
M=D

// return
// r13 = arg1 this where the stack will go
@ARG
D=M+1
@R13
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

// r14 = stack.pop()
@SP
AM=M-1
D=M
@R14
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

