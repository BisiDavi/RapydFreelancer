import axios from "axios";

export function getWallet(walletId?: string) {
  const url = walletId ? `/api/e-wallet/${walletId}` : "/api/e-wallet";
  return axios.get(url);
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

export function getUserProfile(userEmail: string) {
  return axios.get("/api/db", {
    params: {
      collection: "users",
      query: { email: userEmail },
      projection: { _id: 1, email: 1, name: 1, role: 1, profileImage: 1 },
    },
  });
}

export function updateUserDB(userEmail: string, url: string) {
  return axios.put("/api/db", {
    collection: "users",
    query: { email: userEmail },
    data: { $set: { profileImage: url } },
  });
}
