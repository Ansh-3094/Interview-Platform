import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions.js";

export const useCreateSession = () => {
  const { getToken } = useAuth();

  const result = useMutation({
    mutationFn: async (data) => {
      const token = await getToken();
      return sessionApi.createSession({ data, token });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create room");
    },
  });
  return result;
};

export const useActiveSessions = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: async () => {
      const token = await getToken();
      return sessionApi.getActiveSessions({ token });
    },
    enabled: isLoaded && !!isSignedIn,
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: true,
  });
  return result;
};

export const useMyRecentSessions = () => {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: async () => {
      const token = await getToken();
      return sessionApi.getMyRecentSessions({ token });
    },
    enabled: isLoaded && !!isSignedIn,
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: true,
  });
  return result;
};

export const useSessionById = (id) => {
  const { getToken } = useAuth();

  const result = useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const token = await getToken();
      return sessionApi.getSessionById({ id, token });
    },
    enabled: !!id,
    refetchInterval: 5000, // refetch every 5 sesconds to detect session status changes
  });
  return result;
};

export const useJoinSession = () => {
  const { getToken } = useAuth();

  const result = useMutation({
    mutationFn: async ({ id, password }) => {
      const token = await getToken();
      return sessionApi.joinSession({ id, password, token });
    },
    onSuccess: () => toast.success("joined session successfully"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to join session"),
  });
  return result;
};

export const useEndSession = () => {
  const { getToken } = useAuth();

  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: async (id) => {
      const token = await getToken();
      return sessionApi.endSession({ id, token });
    },
    onSuccess: () => toast.success("Session ended successfully"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to end session"),
  });
  return result;
};
