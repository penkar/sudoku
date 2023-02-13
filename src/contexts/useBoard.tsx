import React from "react";

import { createBoard } from "../utilities/sudokuBoardCreate";

type PrivateBoard = {
  currentCell?: number;
  currentNumber?: number;
  value?: number;
  fieldValue: number;
  hidden: boolean;
  guess: number;
};

interface ReducerType {
  currentCell?: number;
  currentNumber?: number;
  difficulty: number;
  editMode: boolean;
  errors: number;
  board: PrivateBoard[];
}

interface PublicInterface extends ReducerType {
  actions?: {
    selectCell: (cell: number) => void;
    selectNumber: (num: number) => void;
  };
}

const BoardContext = React.createContext<PublicInterface>({
  board: [],
  currentCell: undefined,
  difficulty: 0.5,
  editMode: false,
  errors: 0,
});

const initialState = {
  currentCell: undefined,
  currentNumber: undefined,
  difficulty: 0.5,
  editMode: false,
  errors: 0,
  fieldValue: 0,
  board: [],
};
type ActionType =
  | {
      type: "SET_DIFFICULTY";
      difficulty: number;
    }
  | {
      type: "SET_NEW_BOARD";
      board: PrivateBoard[];
    }
  | {
      type: "SET_EDIT_MODE";
      editMode: boolean;
    }
  | {
      type: "MAKE_GUESS";
      position: number;
      guess: number;
    }
  | {
      type: "SELECT_CELL";
      cell?: number;
    }
  | {
      type: "SELECT_NUM";
      num?: number;
    };

function boardReducer(state: ReducerType, action: ActionType): ReducerType {
  switch (action.type) {
    case "SET_DIFFICULTY": {
      return { ...state, difficulty: action.difficulty || 0.5 };
    }
    case "SET_NEW_BOARD":
      return { ...state, board: action.board, errors: 0, editMode: false };
    case "SET_EDIT_MODE":
      return { ...state, editMode: action.editMode };
    case "MAKE_GUESS": {
      const newboard = [...state.board];
      let errors = state.errors;
      const position = {
        ...newboard[action.position],
        fieldValue: action.guess,
      };
      if (position.value !== action.guess) {
        errors += 1;
      }
      newboard[action.position] = position;

      return { ...state, errors, board: newboard };
    }
    case "SELECT_CELL": {
      return { ...state, currentCell: action.cell };
    }
    case "SELECT_NUM": {
      return { ...state, currentNumber: action.num };
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
    { currentCell, currentNumber, difficulty, editMode, errors, board },
    dispatch,
  ] = React.useReducer(boardReducer, initialState);

  React.useEffect(() => {
    const newBoard = createBoard().map((value) => {
      const hiddenField = Math.random() > difficulty;
      return {
        value,
        fieldValue: hiddenField ? 0 : value,
        guess: 0,
        hidden: hiddenField,
      };
    });
    dispatch({ type: "SET_NEW_BOARD", board: newBoard });
  }, [difficulty]);

  const exposedState: PublicInterface = {
    currentCell: currentCell,
    currentNumber: currentNumber,
    difficulty: difficulty,
    editMode: editMode,
    errors: errors,
    actions: {
      selectCell: (cell?: number) => dispatch({ type: "SELECT_CELL", cell }),
      selectNumber: (num?: number) => dispatch({ type: "SELECT_NUM", num }),
    },
    board: board.map(
      ({ fieldValue, guess, hidden }: PrivateBoard): PrivateBoard => ({
        fieldValue,
        guess,
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
