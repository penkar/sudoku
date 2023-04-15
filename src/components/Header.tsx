import { useBoard } from "../contexts/useBoard";

export const Header = () => {
  const { actions } = useBoard();
  const clickMenu = () => actions?.toggleMenu(true);

  return (
    <div className="control-panel__header">
      <div className="control-panel__icon" onClick={clickMenu}>
        &#9776;
      </div>
      <div className="control-panel__title">Sudoku</div>
    </div>
  );
};
