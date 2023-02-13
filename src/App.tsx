import { Board } from "./components/Board";
import { BoardProvider } from "./contexts/useBoard";
import { ControlPanel } from "./components/ControlPanel";
import { Numpad } from "./components/Numpad";

import "./App.css";

function App() {
  return (
    <BoardProvider>
      <>
        <Board />
        <ControlPanel />
        <Numpad />
      </>
    </BoardProvider>
  );
}

export default App;
