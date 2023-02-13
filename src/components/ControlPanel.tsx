import cn from "classnames";
import { useBoard } from "../contexts/useBoard";

export const ControlPanel = () => {
  const { actions, errors, editMode } = useBoard();
  console.log(5, { actions, errors, editMode });

  return (
    <div className="control-panel">
      <div className="control-panel__errors">&#9888;{errors}</div>
      <div
        className={cn("control-panel__pencil", { "edit-mode": editMode })}
        onClick={actions?.toggleEditMode}
      >
        &#9998;
      </div>
    </div>
  );
};
