// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import Test from "./components/test/test";
import Test2 from "./components/test/test2";
// import Result from "./components/result/result";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          variant="primary"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <Button variant="danger">Click Me</Button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Test2 />
      {/* <Test /> */}
      {/* <Result /> */}
    </>
  );
}

export default App;
