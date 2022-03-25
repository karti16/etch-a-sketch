let mainContainer = document.querySelector(".main-container");
let gridCount = 20;
let slider = document.getElementById("myRange");
let sliderValue = document.getElementById("gridvalue");
sliderValue.innerHTML = slider.value;
let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clearPaint);

// Calling main function to start with default grid size
main();

// Main function. calling all other fuction
function main() {
  generateGrin(gridCount);
  setWidth();
  paint();
}

slider.oninput = function () {
  gridCount = this.value;
  sliderValue.innerHTML = gridCount;
  console.log(mainContainer);
  main();
};

// Generate Grid and attach to html
function generateGrin(size) {
  const box = `<div class="box"></div>`.repeat(size);
  const row = `<div class="row-container">${box}</div>`.repeat(size);
  mainContainer.innerHTML = row;
}

// Set width of the boxes after generating it
function setWidth() {
  boxes = document.querySelectorAll(".box");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.width = `${mainContainer.scrollWidth / gridCount}px`;
    boxes[i].style.height = `${Math.floor(
      mainContainer.scrollHeight / gridCount
    )}px`;
    console.log(mainContainer.scrollHeight);
  }
}

// Starts painting with mouse click and mouseclick and mouse move
function paint() {
  for (let i = 0; i < boxes.length; i++) {
    console.log();
    boxes[i].addEventListener("mousedown", function () {
      boxes[i].style.backgroundColor = "green";
    });
    boxes[i].addEventListener("mouseover", function () {
      if (mouseDown && mouseMove) {
        boxes[i].style.backgroundColor = "green";
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

// No longer needed as the slider replace this function
// function getSize() {
//   gsize = +document.querySelector("#grid-size").value;
//   clearGrid();

//   gridCount = gsize;
//   console.log(gridCount);
//   mainContainer = document.querySelector(".main-container");
//   // createRow();
//   generateGrin(gridCount);
//   setWidth();
//   red();
// }

//Clear the grid before generating other size grids
function clearGrid() {
  mainContainer.innerHTML = "";
}

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
