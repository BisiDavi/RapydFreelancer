import axios from "axios";

export function getWallet() {
  return axios.get("/api/admin/e-wallet");
}

export function getJobs() {
  return axios.get("/api/jobs");
}

