import axios from "axios";

export function createWallet() {
  return axios.post("/api/e-wallet", {});
}