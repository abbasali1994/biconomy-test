import { useContext } from "react";
import { Web3ProviderContext } from "../context/Web3Provider";

export const Login = () => {
  const { login } = useContext(Web3ProviderContext);
  return <button onClick={login}>Login</button>;
};
