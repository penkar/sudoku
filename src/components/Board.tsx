import { Cell } from "./Cell";
import { useBoard } from "../contexts/useBoard";

export const Board = () => {
  const { actions, board, currentCell, currentNumber, editMode } = useBoard();
  const props = { currentNumber, selectCell: actions?.selectCell, editMode };

  return (
    <div className="board-component">
      {board.map(({ fieldValue, guess, hidden }, index) => (
        <Cell
          currentCell={currentCell === index}
          fieldValue={fieldValue}
          guess={guess}
          hidden={hidden}
          index={index}
          key={index}
          {...props}
        />
      ))}
    </div>
  );
};
