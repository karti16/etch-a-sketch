const mainContainer = document.querySelector(".main-container");
let gridCount = 16;

createRow();
let rowCont = document.querySelectorAll(".row-container");
createBox();

function createRow() {
  for (let i = 1; i <= gridCount; i++) {
    let d = document.createElement("div");
    d.classList = `row-container`;
    mainContainer.append(d);
  }
}
function createBox() {
  for (row of rowCont) {
    for (let i = 1; i <= gridCount; i++) {
      let d = document.createElement("div");
      d.classList = `box`;
      row.append(d);
    }
  }
}

let boxes = document.querySelectorAll(".box");
for (box of boxes) {
  box.style.width = `${mainContainer.offsetWidth / gridCount}px`;
}
