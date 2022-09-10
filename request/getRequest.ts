import axios from "axios";

export function getWallet() {
  return axios.get("/api/e-wallet");
}

export function getJobs() {
  return axios.get("/api/jobs");
}

