let mainContainer = document.querySelector(".main-container");

let gridCount = 16;
// createRow();
generateGrin(gridCount);
setWidth();
red();

function generateGrin(size) {
  const box = `<div class="box"></div>`.repeat(size);
  const row = `<div class="row-container">${box}</div>`.repeat(size);
  mainContainer.innerHTML = row;
}

// function createRow() {
//   for (let i = 1; i <= gridCount; i++) {
//     let d = document.createElement("div");
//     d.classList = `row-container`;

//     mainContainer.append(d);
//   }
//   rowCont = document.querySelectorAll(".row-container");
//   createBox(gridCount, rowCont);
// }

// function createBox() {
//   for (row of rowCont) {
//     for (let i = 1; i <= gridCount; i++) {
//       let d = document.createElement("div");
//       d.classList = `box`;
//       row.append(d);
//     }
//   }
// }

function setWidth() {
  boxes = document.querySelectorAll(".box");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.width = `${mainContainer.offsetWidth / gridCount}px`;
    boxes[i].style.height = `${mainContainer.offsetWidth / gridCount}px`;
  }
}

function red() {
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

function noRed() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = "";
  }
}

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", noRed);

let mouseDown = false;
let mouseMove = false;

mainContainer.addEventListener("mousedown", () => (mouseDown = true));
mainContainer.addEventListener("mousemove", () => (mouseMove = true));
mainContainer.addEventListener("mouseup", () => {
  mouseDown = false;
  mouseMove = false;
});

function getSize() {
  gsize = +document.querySelector("#grid-size").value;
  clearGrid();

  gridCount = gsize;
  console.log(gridCount);
  mainContainer = document.querySelector(".main-container");
  // createRow();
  generateGrin(gridCount);
  setWidth();
  red();
}

function clearGrid() {
  mainContainer.innerHTML = "";
}

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
