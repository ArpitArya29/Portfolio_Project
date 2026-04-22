import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useProjectStore = create((set, get) => ({
    allProjects : [],
    isFetchingProjects : false,
    isAddingProject : false,
    isUpdatingProject : false,
    isDeletingProject : false,

    getAllProjects : async() => {
        set({ isFetchingProjects : true });

        try {
            const response = await axiosInstance.get("/user/projects");

            set({ allProjects : response.data.projects });

        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching projects");

        } finally {
            set({ isFetchingProjects : false });
        }
    },

    addProjects : async(data) => {
        set({ isAddingProject : true });

        try {
            const response = await axiosInstance.post("/user/projects/create", data);

            const { allProjects } = get();

            set({ allProjects : [...allProjects, ...response.data.addedProjects] });

        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding projects");

        } finally {
            set({ isAddingProject : false });
        }
    },

    updateProject : async(data, id) => {
        set({ isUpdatingProject : true });

        console.log("update data",data);
        

        try {
            const response = await axiosInstance.put(`/user/projects/update/${id}`, data);

            const { allProjects } = get();

            const updatedProject = response.data.updatedProject

            const updatedProjects = allProjects.map((project) => project.id !==id ? project : updatedProject);

            set({ allProjects : updatedProjects });

        } catch (error) {
            if(error.response?.status === 400) {
                toast("No changes to save", {
                    icon: "⚠️",
                });
            } else {
                toast.error(error.response?.data?.message || "Error updating project");
            }

        } finally {
            set({ isUpdatingProject : false });
        }
    },

    deleteProject : async(id) => {
        set({ isDeletingProject : true });

        try {
            const response = await axiosInstance.delete(`/user/projects/delete/${id}`);

            const { allProjects } = get();

            set({ allProjects : allProjects.filter((project) => project.id !== id) })

        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting project");

        } finally {
            set({ isDeletingProject : false })
        }
    }
}))