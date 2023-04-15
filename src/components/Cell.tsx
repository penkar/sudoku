import React from "react";
import cn from "classnames";

interface Props {
  currentCell: boolean;
  currentNumber?: number;
  currentState: number;
  editMode: boolean;
  fieldValue: number;
  guess: number;
  guessSet: Set<number>;
  hidden: boolean;
  index: number;
  selectCell?: (arg1: number) => void;
  selectNumberCell?: (arg1: number) => void;
}

const BORDER_RIGHT = [
  2, 11, 20, 29, 38, 47, 56, 65, 74, 5, 14, 23, 32, 41, 50, 59, 68, 77, 8, 17,
  26, 35, 44, 53, 62, 71, 80,
];
const BORDER_LEFT = [0, 9, 18, 27, 36, 45, 54, 63, 72];
// 3, 12, 21, 30, 39, 48, 57, 66, 75, 6, 15,  24, 33, 42, 51, 60, 69, 78,];
const BORDER_TOP = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 27, 28, 29, 30, 31, 32, 33, 34, 35, 54, 55, 56, 57,
  58, 59, 60, 61, 62,
];
const BORDER_BOTTOM = [72, 73, 74, 75, 76, 77, 78, 79, 80];
// 18, 19, 20, 21, 22, 23, 24, 25, 26, 45, 46, 47, 48, 49, 50, 51, 52, 53,

export const Cell = ({
  currentCell,
  currentNumber,
  currentState,
  editMode,
  fieldValue,
  guess,
  guessSet,
  hidden,
  index,
  selectCell,
  selectNumberCell,
}: Props) => {
  const correctGuess = hidden && Boolean(fieldValue);
  const className = cn("cell", {
    "cell-right": BORDER_RIGHT.includes(index),
    "cell-bottom": BORDER_BOTTOM.includes(index),
    "cell-left": BORDER_LEFT.includes(index),
    "cell-top": BORDER_TOP.includes(index),
    "cell-selected": correctGuess,
    "cell-current": currentCell,
    "cell-current-number": fieldValue === currentNumber,
    "cell-selectable": !fieldValue,
    "cell-error-state": currentCell && currentState === 1,
  });
  const clickEvent = () => {
    if (fieldValue) {
      selectNumberCell && selectNumberCell(fieldValue);
    } else {
      selectCell && selectCell(index);
    }
  };

  return (
    <div className={className} onClick={clickEvent}>
      <div className="cell__field-value">
        {fieldValue !== 0 ? fieldValue : ""}
      </div>
      {fieldValue === 0 && (
        <div className="cell__field-guess">
          <div>{guessSet.has(1) ? 1 : null}</div>
          <div>{guessSet.has(2) ? 2 : null}</div>
          <div>{guessSet.has(3) ? 3 : null}</div>
          <div>{guessSet.has(4) ? 4 : null}</div>
          <div>{guessSet.has(5) ? 5 : null}</div>
          <div>{guessSet.has(6) ? 6 : null}</div>
          <div>{guessSet.has(7) ? 7 : null}</div>
          <div>{guessSet.has(8) ? 8 : null}</div>
          <div>{guessSet.has(9) ? 9 : null}</div>
        </div>
      )}
    </div>
  );
};
