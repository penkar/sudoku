import React from "react";

import { createBoard } from "../utilities/sudokuBoardCreate";
import { compareCells } from "../utilities/sudokuBoardChecks";

export type PrivateBoard = {
  currentCell?: number;
  currentNumber?: number;
  fieldValue: number;
  guess: number;
  guessSet: Set<number>;
  hidden: boolean;
  value?: number;
};

interface ReducerType {
  board: PrivateBoard[];
  currentCell?: number;
  currentNumber?: number;
  currentState: number;
  // 0 is normal state
  // 1 is error state for a cell
  // 2 is complete state
  difficulty: number;
  editMode: boolean;
  errors: number;
}

interface PublicInterface extends ReducerType {
  actions?: {
    restart: () => void;
    selectCell: (cell: number) => void;
    selectNumberCell: (num: number) => void;
    selectNumber: (num: number) => void;
    toggleEditMode: () => void;
  };
}

const BoardContext = React.createContext<PublicInterface>({
  board: [],
  currentCell: undefined,
  currentState: 0,
  difficulty: 0.5,
  editMode: false,
  errors: 0,
});

const initialState = {
  currentCell: undefined,
  currentNumber: undefined,
  currentState: 0,
  difficulty: 0.5,
  editMode: false,
  errors: 0,
  fieldValue: 0,
  board: [],
};
type ActionType =
  | { type: "SET_DIFFICULTY"; difficulty: number }
  | { type: "SET_NEW_BOARD"; board: PrivateBoard[] }
  | { type: "SET_EDIT_MODE" }
  | { type: "UNSELECT_NUMBER" }
  | { type: "SELECT_CURRENT_NUMBER"; num: number }
  | { type: "SELECT_CELL_FIELD_VALUE"; num: number }
  | { type: "TOGGLE_EDIT_NUMBER"; num: number }
  | { type: "SELECT_CELL"; cell?: number }
  | { type: "SELECT_NUMBER"; num: number };

function boardReducer(state: ReducerType, action: ActionType): ReducerType {
  console.log(action.type, { action, state });
  switch (action.type) {
    case "SET_DIFFICULTY": {
      return {
        ...state,
        currentState: 0,
        difficulty: action.difficulty || 0.5,
      };
    }
    case "SET_NEW_BOARD":
      return {
        ...state,
        board: action.board,
        currentState: 0,
        errors: 0,
        editMode: false,
      };
    case "SET_EDIT_MODE":
      return { ...state, editMode: !state.editMode };
    case "SELECT_CELL": {
      const currentCell =
        action.cell === state.currentCell ? undefined : action.cell;
      return {
        ...state,
        currentCell,
        currentNumber: undefined,
        currentState: 0,
      };
    }
    case "UNSELECT_NUMBER": {
      return { ...state, currentNumber: undefined, currentState: 0 };
    }
    case "SELECT_CURRENT_NUMBER": {
      return { ...state, currentNumber: action.num, currentState: 0 };
    }
    case "SELECT_CELL_FIELD_VALUE": {
      return {
        ...state,
        currentNumber: action.num,
        currentState: 0,
        currentCell: undefined,
      };
    }
    case "TOGGLE_EDIT_NUMBER": {
      const currentCell = state.currentCell || 0;
      const board = state.board;
      const cell = board[currentCell];
      const guessSet = cell.guessSet;
      if (guessSet.has(action.num)) {
        guessSet.delete(action.num);
      } else {
        guessSet.add(action.num);
      }
      state.board[currentCell].guessSet = guessSet;
      board[currentCell].guessSet = guessSet;
      return { ...state, board, currentState: 0 };
    }
    case "SELECT_NUMBER": {
      // Action called when user clicks on a number from the number pad.
      const currentCell = state.currentCell || 0;
      const value = state.board[currentCell].value;

      if (value === action.num) {
        const board = state.board;
        const cell = {
          ...board[currentCell],
          fieldValue: value,
        };
        board[currentCell] = cell;
        const currentState = compareCells(board) ? 2 : 0;
        return {
          ...state,
          board,
          currentCell: undefined,
          currentNumber: value,
          currentState: currentState,
        };
      } else {
        return {
          ...state,
          errors: state.errors + 1,
          currentNumber: undefined,
          currentState: 1,
        };
      }
    }
    default: {
      return state;
    }
  }
}

interface ProviderLayer {
  children: React.ReactElement;
}

function BoardProvider({ children }: ProviderLayer) {
  const [
    {
      currentCell,
      currentNumber,
      currentState,
      difficulty,
      editMode,
      errors,
      board,
    },
    dispatch,
  ] = React.useReducer(boardReducer, initialState);

  const startNewBoard = () => {
    const newBoard = createBoard().map((value) => {
      const hiddenField = Math.random() > difficulty;
      return {
        value,
        fieldValue: hiddenField ? 0 : value,
        guess: 0,
        guessSet: new Set<number>(),
        hidden: hiddenField,
      };
    });
    dispatch({ type: "SET_NEW_BOARD", board: newBoard });
  };

  React.useEffect(() => {
    startNewBoard();
  }, [difficulty]);

  const exposedState: PublicInterface = {
    currentCell: currentCell,
    currentNumber: currentNumber,
    currentState: currentState,
    difficulty: difficulty,
    editMode: editMode,
    errors: errors,
    actions: {
      restart: startNewBoard,
      selectCell: (cell?: number) => dispatch({ type: "SELECT_CELL", cell }),
      selectNumberCell: (num: number) =>
        dispatch({ type: "SELECT_CELL_FIELD_VALUE", num }),
      selectNumber: (num: number) => {
        if (currentCell === undefined) {
          if (num === currentNumber) {
            return dispatch({ type: "UNSELECT_NUMBER" });
          } else {
            return dispatch({ type: "SELECT_CURRENT_NUMBER", num });
          }
        } else {
          if (editMode) {
            return dispatch({ type: "TOGGLE_EDIT_NUMBER", num });
          } else {
            return dispatch({ type: "SELECT_NUMBER", num });
          }
        }
      },
      toggleEditMode: () => dispatch({ type: "SET_EDIT_MODE" }),
    },
    board: board.map(
      ({
        fieldValue,
        guess,
        guessSet,
        hidden,
      }: PrivateBoard): PrivateBoard => ({
        fieldValue,
        guess,
        guessSet,
        hidden,
      })
    ),
  };

  return (
    <BoardContext.Provider value={exposedState}>
      {children}
    </BoardContext.Provider>
  );
}

const useBoard = () => {
  const exposedState = React.useContext(BoardContext);
  return exposedState;
};

export { BoardProvider, useBoard };
