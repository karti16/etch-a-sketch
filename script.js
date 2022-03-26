window.onload = function () {
  let gridbtn = document.querySelector(".gridline");
  gridbtn.addEventListener("click", toggleGrid);
};

let mainContainer = document.querySelector(".main-container");
let boxes = document.getElementsByClassName("box");

//Slider functions
let slider = document.getElementById("myRange");
let sliderValue = document.getElementById("gridvalue");
document.getElementById("myRange").value = "20";

//20 x 20 instead 20
sliderValue.innerHTML = "20 x 20";

//eventlistener for cursor
slider.addEventListener("mouseup", updateGrid);

//eventlistener for touch
slider.addEventListener("touchend", updateGrid);

//Clear paint
let clear = document.querySelector(".clear");
clear.addEventListener("click", clearPaint);
// clear.addEventListener("pointerdown", clearPaint);

//Reset to default size
let reset = document.querySelector(".reset");
reset.addEventListener("click", resetGrid);
reset.addEventListener("pointerdown", resetGrid);

//for calculating box width
let containerWidth = 500;
//default grid size value
let gridCount = 20;

//default grid color
let paintColor = "rgb(0, 128, 0)";

// Reset grid to default size and color
function resetGrid() {
  gridCount = 20;
  paintColor = "rgb(0, 128, 0)";
  document.getElementById("myRange").value = "20";
  sliderValue.innerHTML = "20 x 20";
  main();
}

// Calling main function to start with default grid size
main();

// Main function. calling all other function
function main() {
  generateGrid(gridCount);
  setWidth();
  color();
  cursorPaint();
  touchPaint();
  erase();

  downloadImage();
}

//Update grid with the range slider

function updateGrid() {
  gridCount = slider.value;
  sliderValue.innerHTML = `${slider.value} x ${slider.value}`;
  main();
}

//Generate grid size
function generateGrid(size) {
  // const box = `<div class="box"></div>`.repeat(size * size);
  let box = "";
  for (let i = 0; i < size * size; i++) {
    box += `<div class="box item${i}"></div>`;
  }
  mainContainer.innerHTML = box;
}

// Set width of the boxes after generating it
function setWidth() {
  let gridWidth = containerWidth / gridCount;
  setCssVar("--count", `${gridCount}`);
  setCssVar("--width", `${gridWidth}px`);
}

// Starts painting with mouse click and mouseclick and mouse move
function cursorPaint() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("mousedown", function () {
      boxes[i].style.backgroundColor = paintColor;
    });
    boxes[i].addEventListener("mouseover", function () {
      if (mouseDown && mouseMove) {
        boxes[i].style.backgroundColor = paintColor;
      }
    });
  }
}

// Clears the paint already painted
function clearPaint() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = "";
  }
}

// Helps to check if mouse is draging or not
let mouseDown = false;
let mouseMove = false;

mainContainer.addEventListener("mousedown", () => (mouseDown = true));
mainContainer.addEventListener("mousemove", () => (mouseMove = true));
mainContainer.addEventListener("mouseup", () => {
  mouseDown = false;
  mouseMove = false;
});

// Generated random rgb color to paint in rainbow color
function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

//Paint with touch screen
function touchPaint() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("pointerdown", function (e) {
      if (isTouchScreendevice()) boxes[i].style.backgroundColor = paintColor;
    });

    boxes[i].addEventListener("pointermove", function (e) {
      if (isTouchScreendevice()) boxes[i].style.backgroundColor = paintColor;
    });

    boxes[i].addEventListener("pointermove", (e) =>
      e.target.releasePointerCapture(e.pointerId)
    );
  }
}

//Check if the touch screen or not
function isTouchScreendevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

//Color Picker
function color() {
  let colorPicker = document.querySelector("#colorPicker");
  colorPicker.addEventListener("change", function () {
    paintColor = colorPicker.value;
  });
}

//Earsing paint
function erase() {
  let erasebtn = document.querySelector(".eraser");
  erasebtn.addEventListener("click", function () {
    paintColor = "#ffffff";
  });
}
//Toggle grid
function toggleGrid() {
  if ("rgba(61, 61, 61, 0.5)" === getCssVar("--borderColor").trim()) {
    setCssVar("--borderColor", "rgba(61, 61, 61, 0.0)");
  } else {
    setCssVar("--borderColor", "rgba(61, 61, 61, 0.5)");
  }
}
//`rgba(61, 61, 61, 0.5)`;

//get css variable
function getCssVar(varName) {
  r = document.querySelector(":root");
  rs = getComputedStyle(r);
  return rs.getPropertyValue(varName);
}
//Set css variable
function setCssVar(varName, varValue) {
  r = document.querySelector(":root");
  r.style.setProperty(varName, varValue);
}

//Download image
function downloadImage() {
  document.getElementById("download").addEventListener("click", function () {
    toggleGrid();
    html2canvas(document.querySelector(".main-container")).then(function (
      canvas
    ) {
      var anchorTag = document.createElement("a");
      // usefull to preview image
      // document.body.appendChild(anchorTag);
      // document.getElementById("previewImg").appendChild(canvas);
      anchorTag.download = "filename.jpg";
      anchorTag.href = canvas.toDataURL();
      anchorTag.target = "_blank";
      anchorTag.click();
    });
  });
}
