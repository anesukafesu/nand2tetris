@i
M=0 // i = 0

@R2 // R2 = 0
M=0

(LOOP)
// If R0 - i == 0, STOP
@R0
D=M // D = R0
@i
D=D-M
@END
D;JEQ

// R2 += R1
@R1
D=M
@R2
M=D+M

// i = i + 1
@i
M=M+1

// Loop again
@LOOP
0;JMP

(END)
@END
0;JMP