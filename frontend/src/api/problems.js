import axiosInstance from "../lib/axios";

const withAuthHeaders = (token) =>
  token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : undefined;

export const problemsApi = {
  getProblems: async ({ token } = {}) => {
    const response = await axiosInstance.get(
      "/problems",
      withAuthHeaders(token),
    );
    return response.data;
  },

  getProblemById: async ({ id, token }) => {
    const response = await axiosInstance.get(
      `/problems/${id}`,
      withAuthHeaders(token),
    );
    return response.data;
  },
};
