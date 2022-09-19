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

export async function escrowPayment(data: any) {
  const getUserWallet: { ewallet: string }[] = await axios.get("/api/db", {
    params: {
      collection: "users",
      query: { email: data.email },
      projection: { ewallet: 1 },
    },
  });

  console.log("getUserWallet", getUserWallet);
  const requestData = {
    ...data,
    ewallet: getUserWallet[0].ewallet,
  };
  console.log("requ-requestData", requestData);
  return axios.post("/api/payment", requestData);
}
