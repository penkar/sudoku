import type { Board } from "../types";
import type { PrivateBoard } from "../contexts/useBoard";

export const checkRows = (gameBoard: Board): boolean => {
  let validBoard = true;
  for (let i = 0; i < 9; i++) {
    let row = new Set(gameBoard.slice(i * 9, (1 + i) * 9));
    if (row.size !== 9) {
      validBoard = false;
    }
  }
  return validBoard;
};

export const checkCols = (gameBoard: Board): boolean => {
  let validBoard = true;
  for (let i = 0; i < 9; i++) {
    let column = new Set();
    for (let j = 0; j < 9; j++) {
      column.add(gameBoard[i + j * 9]);
    }
    if (column.size !== 9) validBoard = false;
  }
  return validBoard;
};

export const checkSector = (gameBoard: Board): boolean => {
  let validBoard = true;
  [0, 3, 6, 27, 30, 33, 54, 57, 60].forEach((i) => {
    const sector = new Set();
    [0, 1, 2, 9, 10, 11, 18, 19, 20].forEach((j) => {
      sector.add(gameBoard[i + j]);
    });
    if (sector.size !== 9) validBoard = false;
  });
  return validBoard;
};

export const compareCells = (board: PrivateBoard[]): boolean =>
  board.every(({ value, fieldValue }) => value === fieldValue);
