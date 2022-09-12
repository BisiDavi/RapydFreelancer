import { issueVirtualAccount } from "@/request/postRequest";

export default function useVIrtualAccount() {
  function applyForVirtualAccount(data: { [key: string]: string | any }) {
    return issueVirtualAccount(data);
  }

  return { applyForVirtualAccount };
}
