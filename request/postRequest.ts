import axios from "axios";

export function issueVirtualAccount(data: { [key: string]: string | any }) {
  return axios.post("/api/virtual-account", { data });
}
