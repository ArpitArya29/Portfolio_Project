import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

import { useAuthStore } from "./useAuthStore";
import { use } from "react";

export const useUserStore = create((set, get) => ({
    userDetails : useAuthStore.getState().authUser,
    isUpdatingUserDetails : false,

    updateUserDetails : async(data) => {
        set({ isUpdatingUserDetails : true });
        try {
            const response = await axiosInstance.post("/user/update", data);

            set({ userDetails : response.data.user });

            useAuthStore.getState().setAuthUser(response.data.user);
        } catch (error) {
            if(error.response?.status === 400) {
                toast(error.response.data.message || "Nothing to change", {
                    icon: "⚠️",
                });
                return;
            }
            toast.error(error.response.data.message || "Error updating user details");
        } finally {
            set({ isUpdatingUserDetails : false });
        }
    }
}))