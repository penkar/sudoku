import React from "react";

import { createBoard } from "../utilities/sudokuBoardCreate";

type PrivateBoard = {
  value?: number;
  fieldValue: number;
  hidden: boolean;
  guess: number;
};

interface ReducerType {
  difficulty: number;
  editMode: boolean;
  errors: number;
  board: PrivateBoard[];
}

const BoardContext = React.createContext<ReducerType>({
  board: [],
  difficulty: 0.5,
  editMode: false,
  errors: 0,
});

const initialState = {
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
    default: {
      return state;
    }
  }
}

interface ProviderLayer {
  children: React.ReactElement;
}

function BoardProvider({ children }: ProviderLayer) {
  const [{ difficulty, editMode, errors, board }, dispatch] = React.useReducer(
    boardReducer,
    initialState
  );

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

  const exposedState: ReducerType = {
    difficulty: difficulty,
    editMode: editMode,
    errors: errors,
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
