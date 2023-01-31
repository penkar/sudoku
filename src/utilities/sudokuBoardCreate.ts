import type { Board, BoardSector } from "../types";

const board = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9, 1, 2, 3, 7, 8, 9, 1, 2, 3, 4, 5,
  6, 2, 3, 4, 5, 6, 7, 8, 9, 1, 5, 6, 7, 8, 9, 1, 2, 3, 4, 8, 9, 1, 2, 3, 4, 5,
  6, 7, 3, 4, 5, 6, 7, 8, 9, 1, 2, 6, 7, 8, 9, 1, 2, 3, 4, 5, 9, 1, 2, 3, 4, 5,
  6, 7, 8,
];

const mixSector = (board: BoardSector): BoardSector => {
  for (let i = 0; i < 15; i++) {
    if (Math.random() > 0.5) {
      const group = Math.floor(Math.random() * 3);
      const offset = (group + 1) % 3;
      let intermediate1 = board[offset * 3];
      let intermediate2 = board[offset * 3 + 1];
      let intermediate3 = board[offset * 3 + 2];
      board[offset * 3] = board[group * 3];
      board[offset * 3 + 1] = board[group * 3 + 1];
      board[offset * 3 + 2] = board[group * 3 + 2];
      board[group * 3] = intermediate1;
      board[group * 3 + 1] = intermediate2;
      board[group * 3 + 2] = intermediate3;
    }
  }
  return board;
};

const mixSectors = (board: BoardSector): BoardSector => {
  for (let j = 0; j < 3; j++) {
    const offset = 3 * j;
    for (let i = 0; i < 15; i++) {
      const sectorGroup = Math.floor(Math.random() * 3);
      if (Math.random() > 0.5) {
        let intermediate = board[((1 + sectorGroup) % 3) + offset];
        board[((1 + sectorGroup) % 3) + offset] = board[sectorGroup + offset];
        board[sectorGroup + offset] = intermediate;
      }
    }
  }
  return board;
};

const mixSectorsColumns = (gameBoard: Board): Board => {
  const parseToCols = (gameBoard: Board): BoardSector => {
    const cols: BoardSector = [[], [], [], [], [], [], [], [], []];
    gameBoard.forEach((val: number, index) => {
      cols[index % 9].push(val);
    });
    return cols;
  };
  const joinCols = (columns: BoardSector): Board => {
    const newBoard: number[] = [];
    for (let i = 0; i < 9; i++) {
      columns.forEach((col) => {
        newBoard.push(col[i]);
      });
    }
    return newBoard;
  };

  return joinCols(mixSectors(mixSector(parseToCols(gameBoard))));
};

const mixSectorRows = (gameBoard: Board): Board => {
  const parseToCols = (gameBoard: Board): BoardSector => {
    return [
      gameBoard.slice(0, 9),
      gameBoard.slice(9, 18),
      gameBoard.slice(18, 27),
      gameBoard.slice(27, 36),
      gameBoard.slice(36, 45),
      gameBoard.slice(45, 54),
      gameBoard.slice(54, 63),
      gameBoard.slice(63, 72),
      gameBoard.slice(72, 81),
    ];
  };
  const joinCols = (rows: BoardSector): Board => {
    return rows.flat();
  };

  return joinCols(mixSectors(mixSector(parseToCols(gameBoard))));
};

export const createBoard = () => mixSectorRows(mixSectorsColumns([...board]));
