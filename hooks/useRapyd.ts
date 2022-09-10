import { walletData } from "@/lib/rapyd-data";
import makeRequest from "@/request/makeRequest";

export default function useRapyd() {
  function createWallet() {
    return makeRequest("post", "/v1/user", walletData);
  }

  return { createWallet };
}
