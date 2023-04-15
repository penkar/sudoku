import React from "react";
import cn from "classnames";
import { useBoard } from "../contexts/useBoard";

export const ControlPanel = () => {
  const [len, setLen] = React.useState(0);
  const cTime = Math.min(Math.floor(len), 1800);
  const { actions, difficulty, editMode, errors, time } = useBoard();

  React.useEffect(() => {
    let interval: NodeJS.Timer;
    const currentTime = () =>
      time && setLen((new Date().getTime() - time) / 1000);

    if (time) {
      interval = setInterval(currentTime, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [time]);

  return (
    <div className="control-panel">
      <div className="control-panel__difficulty">
        <div>Difficulty:</div>
        <div>{Math.floor(8 - difficulty * 10.1)}</div>
      </div>
      <div className="control-panel__errors">
        <div>Errors:</div>
        <div>{errors}</div>
      </div>
      <div className="control-panel__time">
        <div>Time</div>
        <div>
          {Math.floor(cTime / 60)}:{cTime % 60 < 10 ? "0" : ""}
          {cTime % 60}
        </div>
      </div>
      <div
        className={cn("control-panel__pencil", { "edit-mode": editMode })}
        onClick={actions?.toggleEditMode}
      >
        &#9998;
      </div>
    </div>
  );
};
