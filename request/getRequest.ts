import axios from "axios";

export function getWallet() {
  return axios.get("/api/e-wallet");
}

export function getJobs() {
  return axios.get("/api/jobs");
}


export function getUserJobs(email: string) {
  return axios.get("/api/db", {
    params: {
      collection: "jobs",
      query: { "user.email": email },
      projection: { title: 1, price: 1, skills: 1 },
    },
  });
}
