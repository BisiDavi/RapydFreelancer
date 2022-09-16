import { useQuery } from "@tanstack/react-query";
import { getBidsFromPostedJobs } from "@/request/getRequest";

import useAuth from "@/hooks/useAuth";

export default function usePostedJobs() {
  const { authDetails } = useAuth();
  const auth: any = authDetails();
  const { data, status }: any = useQuery(
    ["getBidsFromPostedJobs"],
    () => getBidsFromPostedJobs(auth?.email),
    {
      staleTime: Infinity,
    }
  );

  return { data, status };
}
