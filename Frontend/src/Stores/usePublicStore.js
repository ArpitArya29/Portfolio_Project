import { create } from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePublicStore = create((set) => ({
    isFetchingData : false,
    portfolioData : null,

    fetchPortfolioData : async(id) => {
        set({ isFetchingData : true });

        try {
            const response = await axiosInstance.get(`/public/portfolio/${id}`);

            set({ portfolioData : response.data.portfolio })
        } catch (error) {
            console.log("error fetching portfolio deta", error);
            toast.error(error.response?.data?.message || "Error fetching data");
        } finally {
            set({ isFetchingData : false })
        }
    }
}))