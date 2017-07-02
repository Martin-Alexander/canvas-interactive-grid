// Board Data

var boardData = [
  [1, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 1]
]

// Global Variables

var canvas;
var canvasContext;

var numberOfRows;
var numberOfColumns;
var rowHeight;
var columnWidth;

var mouseCoordinates
var mouseTile;

var selectedTile = false;

// Initialization
function initialize() {
  canvas = document.getElementById("main");
  canvasContext = canvas.getContext("2d");
  
  numberOfRows = boardData.length;
  numberOfColumns = boardData[0].length;

  rowHeight = canvas.height / numberOfRows;
  columnWidth = canvas.width / numberOfColumns;

  canvas.addEventListener("mousemove", function(event) {
    var rect = canvas.getBoundingClientRect();
    mouseCoordinates = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
    mouseTile = {
      col: Math.floor(mouseCoordinates.x / columnWidth), 
      row: Math.floor(mouseCoordinates.y / rowHeight) 
    };
  });

  canvas.addEventListener("mouseup", function(even) {
    if (selectedTile && boardData[mouseTile.row][mouseTile.col] == 0 && boardData[selectedTile.row][selectedTile.col] == 1) {
      boardData[mouseTile.row][mouseTile.col] = 1;
      boardData[selectedTile.row][selectedTile.col] = 0;
      selectedTile = false;
    }
    else if ((selectedTile.col == mouseTile.col && selectedTile.row == mouseTile.row) || boardData[mouseTile.row][mouseTile.col] == 0){
      selectedTile = false;
    } else {
      selectedTile = mouseTile;
    }
  });

  canvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    return false;
  });
}

function drawBoard() {
  for (var row = 0; row < numberOfRows; row++) {
    for (var col = 0; col < numberOfColumns; col++) {
      if (boardData[row][col] == 1){ 
        canvasContext.fillStyle = "red";
      } else {
        canvasContext.fillStyle = "blue";
      }
      canvasContext.fillRect(columnWidth * col, rowHeight * row, columnWidth, rowHeight);
    }
  }
}

function drawMouseOverTile() {
  canvasContext.fillStyle = "rgba(255, 255, 255, 0.4)";
  canvasContext.fillRect(columnWidth * mouseTile.col, rowHeight * mouseTile.row, columnWidth, rowHeight);
}

function drawSelectedTile() {
  canvasContext.fillStyle = "rgba(255, 255, 255, 0.6)";
  canvasContext.fillRect(columnWidth * selectedTile.col, rowHeight * selectedTile.row, columnWidth, rowHeight);
}

window.onload = function() {

  initialize();

  window.setInterval(function() {
    drawBoard();
    if (mouseTile) {
      drawMouseOverTile();
    }
    if (selectedTile) {
      drawSelectedTile();
    }
  }, 30);
}