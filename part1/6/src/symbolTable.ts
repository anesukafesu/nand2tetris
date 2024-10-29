/** Class representing the Symbol Table used in assembling Hack code.*/
export class SymbolTable {
  private symbols: object;
  private nextAvailableDataAddress: number;

  /**
   * Creates and initialises the Symbol table.
   */
  constructor() {
    this.symbols = {};

    // Defining the R symbols
    for (let i = 0; i <= 15; i++) {
      this.symbols[`R${i}`] = i;
    }

    // Defining the I/O symbols
    this.symbols["KBD"] = 24_576;
    this.symbols["SCREEN"] = 16_384;

    // Defining the other symbols
    this.symbols["SP"] = 0;
    this.symbols["LCL"] = 1;
    this.symbols["ARG"] = 2;
    this.symbols["THIS"] = 3;
    this.symbols["THAT"] = 4;

    // References the next memory location to which a data symbol will be added
    this.nextAvailableDataAddress = 16;
  }

  /**
   * Adds a symbol to the symbol table.
   * Multiple symbols can refer to the same memory location. Adding a symbol
   * that already exists will override the existing one.
   * @param name The name of the symbol
   * @param address The address that the symbol is to be assigned
   * @returns - The address that was used for the symbol
   */
  addSymbol(name: string, address?: number): number {
    if (!address) {
      address = this.nextAvailableDataAddress;
      this.nextAvailableDataAddress++;

      if (address == this.symbols["KBD"] || address == this.symbols["SCREEN"]) {
        address++;
        this.nextAvailableDataAddress++;
      }
    }

    // Add the symbol
    this.symbols[name] = address;

    // Return the address
    return address as number;
  }

  /** Gets the address of a symbol
   * @param name The name of the symbol
   * @returns - The address of the symbol if it exists or undefined if it does not
   * exist.
   */
  getSymbol(name: string): number | undefined {
    return this.symbols[name];
  }
}
