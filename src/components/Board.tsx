import { Cell } from "./Cell";
import { useBoard } from "../contexts/useBoard";

export const Board = () => {
  const { board, difficulty, editMode, errors } = useBoard();

  return (
    <div className="board-component">
      {board.map(({ fieldValue, guess, hidden }, index) => (
        <Cell
          editMode={editMode}
          fieldValue={fieldValue}
          guess={guess}
          hidden={hidden}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
};
