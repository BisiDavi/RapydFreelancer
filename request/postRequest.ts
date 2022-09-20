import { formatWalletData } from "@/lib/rapyd-data";
import axios from "axios";

export function issueVirtualAccount(data: { [key: string]: string | any }) {
  return axios.post("/api/virtual-account/bank-account", { data });
}

export function issueVirtualHostedCard(data: any) {
  return axios.post("/api/virtual-account/hosted-card", { data });
}

export function issueVirtualCard(ewallet_contact: string) {
  return axios.post("/api/virtual-account/card", {
    data: {
      card_program: "cardprog_6dd223b05916b19cfacf7b2127a5ff14",
      ewallet_contact,
    },
  });
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

export function updateUserAfterActivatingCard(email: string) {
  return axios.put("/api/db", {
    collection: "users",
    query: { email },
    data: { $set: { "card.activated": true } },
  });
}
