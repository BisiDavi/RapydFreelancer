import { formatWalletData } from "@/lib/rapyd-data";
import axios from "axios";

export function issueVirtualAccount(data: { [key: string]: string | any }) {
  return axios.post("/api/virtual-account", { data });
}

export function createWallet(
  userData: { [key: string]: string },
  profile: any
) {
  const userDetails = { ...userData, ...profile };
  const walletData = formatWalletData(userDetails);
  return axios.post("/api/e-wallet", {
    data: walletData,
    userData,
  });
}

export function connectPayment(data: any) {
  return axios.post("/api/payment", { data });
}



export function makePayment(data: any) {
  return axios.post("/api/payment/make-payment", { data });
}
