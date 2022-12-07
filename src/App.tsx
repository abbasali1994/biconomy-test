import { useContext } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Login } from "./components/Login";
import { Web3ProviderContext } from "./context/Web3Provider";

function App() {
  const { provider } = useContext(Web3ProviderContext);

  return (
    <div className="App">
      <h1>Biconomy Test</h1>
      {provider ? (
        <Dashboard />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
