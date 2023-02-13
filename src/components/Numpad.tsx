import { Num } from "./Num";
import { useBoard } from "../contexts/useBoard";

export const Numpad = () => {
  const { actions, currentNumber } = useBoard();

  const props = {
    clickEvent: actions?.selectNumber,
    currentNumber,
  };

  return (
    <div className="numpad-component">
      <Num complete={false} value={1} {...props} />
      <Num complete={false} value={2} {...props} />
      <Num complete={false} value={3} {...props} />
      <Num complete={false} value={4} {...props} />
      <Num complete={false} value={5} {...props} />
      <Num complete={false} value={6} {...props} />
      <Num complete={false} value={7} {...props} />
      <Num complete={false} value={8} {...props} />
      <Num complete={false} value={9} {...props} />
    </div>
  );
};
