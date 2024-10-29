// Program to multiply two numbers
// RAM[2] = RAM[0] * RAM[1]

// i = 0
@i
M=0

// ram[2] = 0
@R2
M=0

// loop:
(LOOP)

// if i - ram[1] == 0 end
@i
D=M

@R1
D=D-M

@END
D;JEQ

// ram[2] = ram[2] + ram[0]
@R0
D=M

@R2
M=D+M

// i = i + 1
@i
M=M+1

// goto loop
@LOOP
0;JMP

(END)
@END
0;JMP