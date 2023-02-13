import cn from "classnames";

interface Props {
  currentNumber?: number;
  complete: boolean;
  clickEvent?: (arg1: number) => void;
  value: number;
}
export const Num = ({ complete, clickEvent, currentNumber, value }: Props) => {
  const onClick = () => !complete && clickEvent && clickEvent(value);
  const className = cn("numpad-num", {
    "numpad-num__complete": complete,
    "current-num": value === currentNumber,
  });

  return (
    <div className={className} onClick={onClick}>
      {value}
    </div>
  );
};
