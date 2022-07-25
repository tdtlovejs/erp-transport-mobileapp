import axiosClient from "./axiosClient";

const authApi = {
    login: async (data) => {
        try {
            return await axiosClient.post(`api/v1/user/login`, data);
        } catch (error) {
            throw error;
        }
    },
    showCurrentUser: async () => {
        try {
            return await axiosClient.get(`api/v1/user/current-user`);
        } catch (error) {
            throw error;
        }
    },
};

export default authApi;
