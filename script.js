let gridbtn = document.querySelector(".gridline");
gridbtn.addEventListener("click", toggleGrid);

let erasebtn = document.querySelector(".eraser");
erasebtn.addEventListener("click", erase);

let paintbtn = document.querySelector(".paint");
paintbtn.addEventListener("click", paint);

let oldColorbtn = document.querySelector(".oldcolor");
oldColorbtn.addEventListener("click", chooseOldColor);

window.onload = function () {};

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
let oldColorFlag = true;

//default grid color
let currentPaintColor = "rgb(46, 124, 212)";
let eraserColor = "#ffffff";
let pickedColor = "rgb(0, 128, 0)";
let defaultColor = "rgb(46, 124, 212)";

window.oncontextmenu = (e) => {
  e.preventDefault();
};
//Right click   Not using currently
function righClick() {
  mainContainer.addEventListener("mousedown", function (e) {
    if (e.which == 3) {
    }
  });
}

// mainContainer.oncontextmenu = function () {
//   alert("right click!");
// };

// Reset grid to default size and color
function resetGrid() {
  gridCount = 20;
  currentPaintColor = defaultColor;
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
  downloadImage();
  righClick();
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
    boxes[i].addEventListener("mousedown", function (e) {
      if (
        mouseDown &&
        e.which == 1 &&
        isTouchScreendevice() == false &&
        oldColorFlag
      ) {
        boxes[i].style.backgroundColor = currentPaintColor;
      }
    });
    boxes[i].addEventListener("mouseover", function (e) {
      if (mouseDown && mouseMove) {
        boxes[i].style.backgroundColor = currentPaintColor;
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

mainContainer.addEventListener("mousedown", function (e) {
  if (e.which == 1) {
    mouseDown = true;
  }
});
mainContainer.addEventListener("mousemove", () => (mouseMove = true));
document.addEventListener("mouseup", () => {
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
      if (isTouchScreendevice() && oldColorFlag)
        boxes[i].style.backgroundColor = currentPaintColor;
    });

    boxes[i].addEventListener("pointermove", function (e) {
      if (isTouchScreendevice()) {
        boxes[i].style.backgroundColor = currentPaintColor;
        boxes[i].releasePointerCapture(e.pointerId);
      }
    });
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
    pickedColor = colorPicker.value;
    currentPaintColor = pickedColor;
  });
}

//Earsing paint
function erase() {
  tempColor = currentPaintColor;
  currentPaintColor = eraserColor;
}

// paint cont
function paint() {
  currentPaintColor = pickedColor;
  cursorPaint();
  touchPaint();
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

function chooseOldColor(e) {
  oldColorFlag = false;
  document.body.style.cursor = "crosshair";
  mainContainer.addEventListener("click", function (e) {
    if (e.target.style.backgroundColor !== "") {
      currentPaintColor = e.target.style.backgroundColor;
      document.body.style.cursor = "default";
      oldColorFlag = true;
    }
    document.body.style.cursor = "default";
    oldColorFlag = true;
  });
}
