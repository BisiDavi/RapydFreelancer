import axios from "axios";

export function deleteWallet(walletId: string) {
  return axios.delete("/api/admin/e-wallt", {
    data: { wallet: walletId },
  });
}
