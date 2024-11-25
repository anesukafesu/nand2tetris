class BitmapImage {
  constructor() {
    // Creating 16 rows of the image
    this.rows = new Array(32);

    // Filling the rows with with arrays of zeros
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = new Array(32);
      this.rows[i].fill(0);
    }
  }

  getPixelColor(row, col) {
    const pixelValue = this.rows[row][col];
    return pixelValue == 1 ? "black" : "white";
  }

  togglePixel(row, col) {
    this.rows[row][col] = Number(!this.rows[row][col]);
  }

  import(rows) {
    this.rows = rows;
  }

  decimal() {
    return this.rows.map((row) => {
      const firstHalf = row.slice(0, 16);
      const secondHalf = row.slice(16, 32);

      const firstNumber = Number("0b" + firstHalf.join(""));
      const secondNumber = Number("0b" + secondHalf.join(""));

      return `${firstNumber},${secondNumber}`;
    });
  }
}
