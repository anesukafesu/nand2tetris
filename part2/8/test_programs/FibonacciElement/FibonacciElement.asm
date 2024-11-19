
@256
D=A
@SP
M=D
@Sys.init
0;JMP


// function Sys.init 0
(Sys.init)

// push constant 4
@4
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Main.fibonacci 1
@Sys.init$ret.2
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
@1
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Main.fibonacci
0;JMP
(Sys.init$ret.2)

// label END
(Sys.init$END)

// goto END
@Sys.init$END
0;JMP

// function Main.fibonacci 0
(Main.fibonacci)

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

// push constant 2
@2
D=A
@SP
A=M
M=D
@SP
M=M+1

// lt
@SP
AM=M-1
D=M
A=A-1
D=M-D
@TRUE_LT_Main_3
D;JLT
@SP
A=M-1
M=0
@END_LT_Main_3
0;JMP
(TRUE_LT_Main_3)
@SP
A=M-1
M=-1
(END_LT_Main_3)

// if-goto N_LT_2
@SP
AM=M-1
D=M
@Main.fibonacci$N_LT_2
D;JGT

// goto N_GE_2
@Main.fibonacci$N_GE_2
0;JMP

// label N_LT_2
(Main.fibonacci$N_LT_2)

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

// return
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

// label N_GE_2
(Main.fibonacci$N_GE_2)

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

// push constant 2
@2
D=A
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

// call Main.fibonacci 1
@Main.fibonacci$ret.13
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
@1
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Main.fibonacci
0;JMP
(Main.fibonacci$ret.13)

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

// push constant 1
@1
D=A
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

// call Main.fibonacci 1
@Main.fibonacci$ret.17
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
@1
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Main.fibonacci
0;JMP
(Main.fibonacci$ret.17)

// add
@SP
AM=M-1
A=A-1
D=M
A=A+1
D=D+M
A=A-1
M=D

// return
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

