// function Sys.init 0
(Sys.init)

// push constant 4000
@4000
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
@SP
AM=M-1
D=M
@3
M=D

// push constant 5000
@5000
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 1
@SP
AM=M-1
D=M
@4
M=D

// call Sys.main 0
@Sys.init$ret.5
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
@0
D=D-A
@ARG
M=D
@SP
D=M
@LCL
M=D
@Sys.main
0;JMP
(Sys.init$ret.5)

// pop temp 1
@SP
AM=M-1
D=M
@6
M=D

// label LOOP
(Sys.init$LOOP)

// goto LOOP
@Sys.init$LOOP
0;JMP

// function Sys.main 5
(Sys.main)

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

@SP
A=M
M=0
@SP
M=M+1

// push constant 4001
@4001
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
@SP
AM=M-1
D=M
@3
M=D

// push constant 5001
@5001
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 1
@SP
AM=M-1
D=M
@4
M=D

// push constant 200
@200
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 1
@LCL
D=M
@1
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 40
@40
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 2
@LCL
D=M
@2
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 6
@6
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop local 3
@LCL
D=M
@3
D=D+A
@R13
M=D
@SP
AM=M-1
D=M
@R13
A=M
M=D

// push constant 123
@123
D=A
@SP
A=M
M=D
@SP
M=M+1

// call Sys.add12 1
@Sys.main$ret.21
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
@Sys.add12
0;JMP
(Sys.main$ret.21)

// pop temp 0
@SP
AM=M-1
D=M
@5
M=D

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

// push local 2
@LCL
D=M
@2
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push local 3
@LCL
D=M
@3
A=D+A
D=M
@SP
A=M
M=D
@SP
M=M+1

// push local 4
@LCL
D=M
@4
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

// add
@SP
AM=M-1
A=A-1
D=M
A=A+1
D=D+M
A=A-1
M=D

// add
@SP
AM=M-1
A=A-1
D=M
A=A+1
D=D+M
A=A-1
M=D

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

// function Sys.add12 0
(Sys.add12)

// push constant 4002
@4002
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 0
@SP
AM=M-1
D=M
@3
M=D

// push constant 5002
@5002
D=A
@SP
A=M
M=D
@SP
M=M+1

// pop pointer 1
@SP
AM=M-1
D=M
@4
M=D

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

// push constant 12
@12
D=A
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

