// Load the base address for the screen
@SCREEN
D=A

// Storing that as the initial point for the counter
@current
M=D

// Calculating the counter value that should terminate the loop
@8192
D=D+A
@stop_value
M=D

(MAINLOOP)
// Load the base address for the screen
@SCREEN
D=A

// Storing that as the initial point for the counter
@current
M=D

// Load the keyboard value
@KBD
D=M

// Jump to print white if the keyboard value is 0
@PRINTWHITE
D;JEQ

// Jump to print black if the keyboard value is not 0
@PRINTBLACK
D;JMP

// Prints the entire screen in black
(PRINTBLACK)
@stop_value
D=M

@current
D=D-M

@MAINLOOP
D;JEQ // Exits the loop if we are done printing the entire screen

// Turning each register in the screen memory map black
@current
A=M
M=-1
@current
M=M+1
@PRINTBLACK
0;JMP

// Prints the entire screen in white
(PRINTWHITE)
@stop_value
D=M

@current
D=D-M

@MAINLOOP
D;JEQ // Exits the loop if we are done printing the entire screen

// Turning each register in the screen memory map white
@current
A=M
M=0
@current
M=M+1
@PRINTWHITE
0;JMP