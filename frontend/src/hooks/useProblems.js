import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { problemsApi } from "../api/problems.js";

export const useProblems = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  return useQuery({
    queryKey: ["problems"],
    queryFn: async () => {
      const token = await getToken();
      return problemsApi.getProblems({ token });
    },
    enabled: isLoaded && !!isSignedIn,
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
};
