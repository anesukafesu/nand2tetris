const canvas = document.getElementById("canvas");
const button = document.getElementById("generate-decimal");
const display = document.getElementById("decimal-representation");
const importButton = document.getElementById("import-decimal");

button.addEventListener("click", generateAndDisplayDecimal, false);
importButton.addEventListener("click", importFromDecimal, false);

const image = new BitmapImage();

for (let row = 0; row < 32; row++) {
  for (let col = 0; col < 32; col++) {
    // Create a new pixel element as a div
    const pixel = document.createElement("div");

    // Create a click handler for that pixel
    function handleClick() {
      image.togglePixel(row, col);
      pixel.style.backgroundColor = image.getPixelColor(row, col);
    }

    // Attach the click handler to the click event
    pixel.addEventListener("click", handleClick, false);

    // Add a class for the pixel
    pixel.classList.add(["pixel"]);

    // By default set the background color to white
    pixel.style.backgroundColor = "white";

    // Add the pixel to the canvas div
    canvas.appendChild(pixel);
  }
}

function generateAndDisplayDecimal() {
  display.value = image.decimal().join("\n");
}

function importFromDecimal() {
  const pixels = document.getElementsByClassName("pixel");
  const input = display.value;
  const rows = input.split("\n").map((row) =>
    row
      .split(",")
      .map((number) => Number(number).toString(2).padStart(16, 0))
      .join("")
      .split("")
  );

  console.log(rows);

  image.import(rows);

  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      pixels[i * 32 + j].style.backgroundColor = image.getPixelColor(i, j);
    }
  }
}
