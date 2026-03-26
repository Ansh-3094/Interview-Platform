import axiosInstance from "../lib/axios";

const withAuthHeaders = (token) =>
  token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;

export const sessionApi = {
  createSession: async ({ data, token }) => {
    const response = await axiosInstance.post(
      "/sessions",
      data,
      withAuthHeaders(token),
    );
    const payload = response.data;
    const normalizedSession =
      payload?.session || payload?.data?.session || payload?.data || payload;

    return {
      ...payload,
      session: normalizedSession,
    };
  },

  getActiveSessions: async ({ token } = {}) => {
    const response = await axiosInstance.get(
      "/sessions/active",
      withAuthHeaders(token),
    );
    return response.data;
  },
  getMyRecentSessions: async ({ token } = {}) => {
    const response = await axiosInstance.get(
      "/sessions/my-recent",
      withAuthHeaders(token),
    );
    return response.data;
  },

  getSessionById: async ({ id, token }) => {
    const response = await axiosInstance.get(
      `/sessions/${id}`,
      withAuthHeaders(token),
    );
    return response.data;
  },

  joinSession: async ({ id, password, token }) => {
    const response = await axiosInstance.post(
      `/sessions/${id}/join`,
      {
        password,
      },
      withAuthHeaders(token),
    );
    return response.data;
  },
  endSession: async ({ id, token }) => {
    const response = await axiosInstance.post(
      `/sessions/${id}/end`,
      {},
      withAuthHeaders(token),
    );
    return response.data;
  },
  updateSessionProblem: async ({ id, problemId, token }) => {
    const response = await axiosInstance.patch(
      `/sessions/${id}/problem`,
      { problemId },
      withAuthHeaders(token),
    );
    return response.data;
  },
  getStreamToken: async ({ token } = {}) => {
    const response = await axiosInstance.get(
      `/chat/token`,
      withAuthHeaders(token),
    );
    return response.data;
  },
};
