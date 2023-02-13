import { Cell } from "./Cell";
import { useBoard } from "../contexts/useBoard";

// difficulty,
// errors,
export const Board = () => {
  const { actions, board, currentCell, editMode } = useBoard();
  const props = { selectCell: actions?.selectCell, editMode };

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
