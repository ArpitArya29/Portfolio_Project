import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSkillsStore = create( (set, get) => ({
    allSkills : [],
    isFetchingSkills : false,
    isAddingSkills : false,
    isUpdatingSkill : false,
    isDeletingSkill : false,

    getAllSkills : async() => {
        set( { isFetchingSkills : true } );

        try {
            const response = await axiosInstance.get("/user/skills");

            set( {allSkills : response.data.skills} )

        } catch (error) {
            toast.error("Error fetching skills")

        } finally {
            set( { isFetchingSkills : false })
        }
    },

    addSkills : async(data) => {
        set( { isAddingSkills : true } );
        try {
            const response = await axiosInstance.post("/user/skills/create", data);

            const { allSkills } = get();

            set( { allSkills : [...allSkills, ...response.data.skills] })

        } catch (error) {
            toast.error("Error adding skills");

        } finally {
            set( { isAddingSkills : false } )
        }
    },

    updateSkill : async(data, id) => {
        set( { isUpdatingSkill : true } );
        try {
            const response = await axiosInstance.put(`/user/skills/update/${id}`, data);

            const upSkill = response.data.updatedSkill;

            const { allSkills } = get();

            const updatedSkills = allSkills.map( (skill) => ( skill.id === id ? upSkill : skill))

            set( { allSkills : updatedSkills } )

        } catch (error) {

            if(error.response?.status === 400) {
                toast("No changes to save", {
                    icon: "⚠️",
                });
            } else {

                toast.error("Error updating skill")
            }
            
        } finally {
            set( { isUpdatingSkill : false } )
        }
    },

    deleteSkill : async(id) => {
        set( { isDeletingSkill : true} );

        try {
            const response = await axiosInstance.delete(`/user/skills/delete/${id}`);

            const { allSkills } = get();

            const updatedSkills = allSkills.filter( (skill) => (skill.id !== id));

            set( { allSkills : updatedSkills } )

        } catch (error) {
            toast.error("Error deleting skill")
            
        } finally {
            set( { isDeletingSkill : false} )
        }
    }
}))