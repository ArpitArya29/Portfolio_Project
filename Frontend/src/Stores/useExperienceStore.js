import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExperienceStore = create((set, get) => ({
    allExperiences : [],
    isFetchingExperiences : false,
    isAddingExperience : false,
    isUpdatingExperience : false,
    isDeletingExperience : false,

    getAllExperiences : async() => {
        set({ isFetchingExperiences : true });

        try {
            const response = await axiosInstance.get("/user/experiences");

            set({ allExperiences : response.data.experiences });

        } catch (error) {
            console.log("Error fetching experiences", error.response.data.message);
            toast.error( error.response?.data?.message || "Error fetching experiences");

        } finally {
            set({ isFetchingExperiences : false });
        }
    },

    addExperiences : async(data) => {
        set({ isAddingExperience : true });

        try {
            const response = await axiosInstance.post("/user/experiences/create", data);

            const { allExperiences } = get();

            set({ allExperiences : [...allExperiences, ...response.data.experiences] });
           
        } catch (error) {
            console.log("error adding experiences", error);
            toast.error(error.response?.data?.message || "Error adding Experience");

        } finally {
            set({ isAddingExperience : false });
        }
    },

    updateExperience : async(data, id) => {
        set({ isUpdatingExperience : true });

        try {
            const response = await axiosInstance.put(`/user/experiences/update/${id}`, data);

            const upExperience = response.data.updatedExperience;

            const { allExperiences } = get();

            const updatedExperience = allExperiences.map((exp) => exp.id === id ? upExperience : exp);

            set({ allExperiences : updatedExperience });

        } catch (error) {
            console.log("Error updating experince", error.response.data);
            toast.error(error.response?.data?.message || "Error updating experience");

        } finally {
            set({ isUpdatingExperience : false });
        }
    },

    deleteExperience : async(id) => {
        set({ isDeletingExperience : true });

        try {
            const response = await axiosInstance.delete(`/user/experiences/delete/${id}`);

            const { allExperiences } = get();

            set({ allExperiences : allExperiences.filter((exp) => exp.id !== id) })

        } catch (error) {
            console.log("Error deleting experience", error.response.data);
            toast.error(error.response?.data?.message || "Error deleting experience");

        } finally {
            set({ isDeletingExperience : false });
        }
    }
}))
