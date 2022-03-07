const gridContainer = document.querySelector(".grid-container");
const playBtn = document.querySelector(".btn-play");
const pauseBtn = document.querySelector(".btn-pause");

// Create grids
let row = 100;
let squaresArr;
let allowToPutYellowSquares = true;

function createGrids() {
  for (let i = 0; i < 8000; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(`square-${i}`);
    square.dataset.number = i;
    gridContainer.appendChild(square);
  }

  squaresArr = Array.from(document.querySelectorAll(".square"));
}
createGrids();

// Cut grid into 2D array

function createArrayChunks(squaresArr) {
  let chunks = [],
    i = 0,
    n = squaresArr.length;
  while (i < n) {
    chunks.push(squaresArr.slice(i, (i += row)));
  }
  return chunks;
}

let array2D = createArrayChunks(squaresArr);

//Control the flow of yellow and start if game
playBtn.addEventListener("click", () => {
  allowToPutYellowSquares = false;
  gridContainer.removeEventListener("click", addYellow);
  placeYellowSquare();
  getYellowSquareCoords();
});

// pause the game / allow player to put yellow square
pauseBtn.addEventListener("click", () => {
  allowToPutYellowSquares = true;
  gridContainer.addEventListener("click", addYellow);
  placeYellowSquare();
});

// change square to 'alive square'
function addYellow(e) {
  e.target.classList.add("alive");
}

// Creating starter yellow grids
function placeYellowSquare() {
  if (allowToPutYellowSquares) {
    gridContainer.addEventListener("click", addYellow);
  }
}

placeYellowSquare();

// Get squares with the class 'alive'

function getYellowSquareCoords() {
  let getNodes = [];
  let getCoords = [];
  array2D.forEach((squareRow, i) => {
    squareRow.forEach((squareCol, j) => {
      if (array2D[i][j].classList.contains("alive")) {
        getCoords.push([i, j]);
        getNodes.push(array2D[i][j]);
      }
    });
  });
  console.log(getCoords);

  checkNeighbors(getNodes);
}

// Check for neighbors

function checkNeighbors(nodesArr) {
  console.log(nodesArr);
  // check one before
  nodesArr.forEach((node, i) => {
    let num = +node.dataset.number;
    for (let i = num - 200; i < num + 200; i++) {
      // looking for our cell For a space that is populated:
      if (num === i) {
        // We found it
        // check if cell has neighbor
        let neighbors = [
          squaresArr[i - 100],
          squaresArr[i - 101],
          squaresArr[i - 99],
          squaresArr[i + 100],
          squaresArr[i + 101],
          squaresArr[i + 99],
          squaresArr[i - 1],
          squaresArr[i + 1],
        ];

        let numberOfNeighborsAlive = neighbors.filter((neighbor) =>
          neighbor.classList.contains("alive")
        );

        // Each cell with one or no neighbors dies, as if by solitude

        if (numberOfNeighborsAlive.length === 0)
          squaresArr[i].classList.remove("alive");

        //Each cell with four or more neighbors dies, as if by overpopulation.
        if (numberOfNeighborsAlive.length >= 4) {
          squaresArr[i].classList.remove("alive");
        }

        console.log(neighbors);
      }
    }
  });
}

// Each cell with one or no neighbors dies, as if by solitude

//   let topNeighbors = [
//     squaresArr[i - 100],
//     squaresArr[i - 101],
//     squaresArr[i - 99],
//   ];
//   let bottomNeighbors = [
//     squaresArr[i + 100],
//     squaresArr[i + 101],
//     squaresArr[i + 99],
//   ];
//   let leftNeighbor = squaresArr[i - 1];
//   let rightNeighbor = squaresArr[i + 1];
