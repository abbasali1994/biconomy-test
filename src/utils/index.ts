import type { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";

export async function fetchChainId(provider: SafeEventEmitterProvider): Promise<string> {
  try {
    const web3 = new Web3(provider as any);
    const chainId = await web3.eth.getChainId();
    return chainId.toString();
  } catch (error) {
    return error as string;
  }
}

export async function fetchBalance(provider: SafeEventEmitterProvider): Promise<string> {
  try {
    const web3 = new Web3(provider as any);
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(address) // Balance is in wei
    );
    return balance;
  } catch (error) {
    return error as string;
  }
}

export async function sendTxn(provider: SafeEventEmitterProvider): Promise<any> {
  try {
    const web3 = new Web3(provider as any);
    const fromAddress = (await web3.eth.getAccounts())[0];
    const toAddress = fromAddress;
    const amount = web3.utils.toWei("0.0001");
    const receipt = await web3.eth.sendTransaction({
      from: fromAddress,
      to: toAddress,
      value: amount,
      maxPriorityFeePerGas: "5000000000",
      maxFeePerGas: "6000000000000",
    });

    return receipt;
  } catch (error) {
    return error as string;
  }
}
