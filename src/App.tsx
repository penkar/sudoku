import { BoardProvider } from "./contexts/useBoard";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components";

function App() {
  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  );
}
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.tsx</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>

export default App;
