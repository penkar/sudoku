import { Board } from "./components/Board";
import { BoardProvider } from "./contexts/useBoard";
import { Numpad } from "./components/Numpad";

import "./App.css";

function App() {
  return (
    <BoardProvider>
      <>
        <Board />
        <Numpad />
      </>
    </BoardProvider>
  );
}

export default App;
