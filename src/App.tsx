import { Board } from "./components/Board";
import { BoardProvider } from "./contexts/useBoard";
import { ControlPanel } from "./components/ControlPanel";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { Numpad } from "./components/Numpad";

import "./App.css";

function App() {
  return (
    <BoardProvider>
      <>
        <Header />
        <Board />
        <ControlPanel />
        <Numpad />
        <Menu />
      </>
    </BoardProvider>
  );
}

export default App;
