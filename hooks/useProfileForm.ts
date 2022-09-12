import axios from "axios";
 
import { useAppSelector } from "@/hooks/useRedux";
import { formatWalletData } from "@/lib/rapyd-data";

export default function useProfileForm() {
  const { profile } = useAppSelector((state) => state.user);

  function createWallet(userData: { [key: string]: string }) {
    const userDetails = { ...userData, ...profile };
    console.log("userDetails", userDetails);
    const walletData = formatWalletData(userDetails);
    console.log("walletData", walletData);
    return axios
      .post("/api/e-wallet", { data: walletData })
      .then((response) => console.log("response-wallet", response))
      .catch((err) => console.log("error", err));
  }

  return { createWallet };
}
