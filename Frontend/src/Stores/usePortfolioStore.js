import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const usePortfolioStore = create((set, get) => ({
    allPortfolios : [],
    isFetchingPortfolios : false,
    isCreatingPortfolio : false,
    isUpdatingPortfolio : false,
    isDeletingPortfolio : false,

    getAllPortfolios : async() => {
        set({ isFetchingPortfolios : true });
        try {
            const response = await axiosInstance.get("/user/portfolio");

            set({ allPortfolios : response.data.portfolios });

        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching portfolio");

        } finally {
            set({ isFetchingPortfolios : false });
        }
    },

    addPortfolio : async(data) => {
        set({ isCreatingPortfolio : true });
        try {
            const response = await axiosInstance.post("/user/portfolio/create", data);

            const { allPortfolios } = get();

            set({ allPortfolios : [...allPortfolios, response.data.portfolio] });

        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating portfolio");

        } finally {
            set({ isCreatingPortfolio : false });
        }
    },

    updatePortfolio : async(data, id) => {
        set({ isUpdatingPortfolio : true });
        try {
            const response = await axiosInstance.put(`/user/portfolio/update/${id}`, data);

            const { allPortfolios } = get();
            const updatedPortfolio = response.data.updatedPortfolio;

            set({ allPortfolios : allPortfolios.map((portfolio) => portfolio.id !== id ? portfolio : updatedPortfolio) });

        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating portfolio");

        } finally {
            set({ isUpdatingPortfolio : false });
        }
    },

    deletePortfolio : async(id) => {
        set({ isDeletingPortfolio : true });

        try {
            const response = await axiosInstance.delete(`/user/portfolio/delete/${id}`);

            const { allPortfolios } = get();

            set({ allPortfolios : allPortfolios.filter((portfolio) => portfolio.id !==id) });

        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting portfolio");

        } finally {
            set({ isDeletingPortfolio : false });
        }
    }
}))