import { useAppSelector } from "@/hooks/useRedux";

export default function useProfileForm() {
  const { profile } = useAppSelector((state) => state.user);

  function createWallet(userData: { [key: string]: string }) {
    const userDetails = { ...userData, ...profile };
    console.log("userDetails", userDetails);
  }

  return { createWallet };
}
