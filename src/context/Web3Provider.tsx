import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { createContext, useEffect, useState } from "react";

const clientId = "BMtJiE2WKrH8-ChCOBRfyA27HfSFNPO5giabyQErfNU6gW_hfhudcnHFBBd85rRSMrh0ZYOJTRbHofDKsmDckBE";

export interface Web3ProviderData {
  web3auth: Web3Auth;
  provider: SafeEventEmitterProvider;
  login: () => void;
  logout: () => void;
}

export const Web3ProviderContext = createContext<Web3ProviderData>({
  web3auth: null,
  provider: null,
  login: () => {},
  logout: () => {},
});

export const Web3Provider: React.FC = ({ children }) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);
        await web3auth.initModal();
        if (web3auth.provider) setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };

    initialize();
  }, []);

  const logout = async () => {
    if (web3auth) {
      await web3auth.logout();
      setProvider(null);
    } else console.log("web3auth not initialized yet");
  };

  const login = async () => {
    if (web3auth) {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
    } else console.log("web3auth not setup");
  };

  const ctx: Web3ProviderData = {
    web3auth,
    provider,
    login,
    logout,
  };

  return <Web3ProviderContext.Provider value={ctx}>{children}</Web3ProviderContext.Provider>;
};
