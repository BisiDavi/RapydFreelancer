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

export function connectWalletPayment(data: any) {
  return axios.post("/api/payment/wallet-connect-payment", { data });
}

export async function escrowPayment(data: any, email: string) {
  const getUserWallet = await axios.get("/api/db", {
    params: {
      collection: "users",
      query: { email },
      projection: { ewallet: 1 },
    },
  });

  const requestData = {
    ...data,
    ewallet: getUserWallet?.data[0].ewallet,
  };
  return axios.post("/api/payment", { data: requestData });
}
