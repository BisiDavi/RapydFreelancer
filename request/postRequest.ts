import axios from "axios";

export function createWallet() {
  return axios.post("/api/admin/e-wallte", {});
}
