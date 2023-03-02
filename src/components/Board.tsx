import { Cell } from "./Cell";
import { useBoard } from "../contexts/useBoard";

export const Board = () => {
  const { actions, board, currentCell, currentNumber, currentState, editMode } =
    useBoard();
  const props = { currentNumber, selectCell: actions?.selectCell, editMode };

  return (
    <div className="board-component">
      {board.map(({ fieldValue, guess, guessSet, hidden }, index) => (
        <Cell
          currentCell={currentCell === index}
          currentState={currentState}
          fieldValue={fieldValue}
          guess={guess}
          guessSet={guessSet}
          hidden={hidden}
          index={index}
          key={index}
          {...props}
        />
      ))}
    </div>
  );
};
