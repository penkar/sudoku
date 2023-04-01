import cn from "classnames";
import { useBoard } from "../contexts/useBoard";

interface MenuButtonType {
  difficultyLevel: number;
  level: string;
}

const MenuButton = ({ difficultyLevel, level }: MenuButtonType) => {
  const { actions, difficulty } = useBoard();

  return (
    <div
      className={cn("menu-option", {
        "menu-option__selected": difficultyLevel === difficulty,
      })}
      onClick={() => actions?.setDifficulty(difficultyLevel)}
    >
      Difficulty {level}
    </div>
  );
};

export const Menu = () => {
  const { actions, menuOpen } = useBoard();

  return (
    <div
      className={cn("menu", { open: menuOpen })}
      onClick={() => actions?.toggleMenu(false)}
    >
      <div className="menu-content">
        <h5>Menu</h5>
        <div onClick={actions?.restart}>Restart Level - &#8634;</div>
        <h5>Set Difficulty Level</h5>
        <MenuButton difficultyLevel={0.6} level="1" />
        <MenuButton difficultyLevel={0.5} level="2" />
        <MenuButton difficultyLevel={0.4} level="3" />
        <MenuButton difficultyLevel={0.3} level="4" />
        <MenuButton difficultyLevel={0.2} level="5" />
        <MenuButton difficultyLevel={0.1} level="6" />
      </div>
    </div>
  );
};
