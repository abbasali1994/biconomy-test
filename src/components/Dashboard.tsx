import { useContext, useState } from "react";
import { Web3ProviderContext } from "../context/Web3Provider";
import { fetchBalance, fetchChainId, sendTxn } from "../utils";

function Dashboard() {
  const { logout, provider } = useContext(Web3ProviderContext);

  const [chainID, setChainID] = useState<string | null>();
  const [balance, setBalance] = useState<string | null>();

  const getChainId = async () => {
    if (provider) {
      const chainID = await fetchChainId(provider);
      setChainID(chainID);
    } else console.log("provider not intialised");
  };

  const getBalance = async () => {
    if (provider) {
      const balance = await fetchBalance(provider);
      setBalance(balance);
    } else console.log("provider not intialised");
  };

  const sendTransaction = async () => {
    if (provider) await sendTxn(provider);
    else console.log("provider not intialised");
  };

  return (
    <div className="dashboard">
      <h2>User Logged In</h2>
      <button onClick={getChainId}>Get Chain ID</button>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={sendTransaction}>Send Transaction</button>
      <button onClick={logout}>Log Out</button>
      {chainID && <span>Chain ID: {chainID}</span>}
      {balance && <span>Balance: {balance}</span>}
    </div>
  );
}

export default Dashboard;
