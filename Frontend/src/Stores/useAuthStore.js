import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
 
export const useAuthStore = create( (set) => ({
    authUser : null,
    isSigningUp : false,
    isSignedUp : false,
    isLoggingIn : false,
    isLoggingOut : false,
    isCheckingAuth : false,

    checkAuth : async() => {
        set( {isCheckingAuth : true})

        try {
            const response = await axiosInstance.get("/auth/check");
    
            set( {authUser : response.data.user});

        } catch (error) {
            set( {authUser : null})

        } finally {
            set( {isCheckingAuth : false})
        }
    },

    signUp : async(data) => {
        set( {isSigningUp : true});

        try {
            const response = await axiosInstance.post("/auth/register", data);

            set( {isSignedUp : true} )

            toast.success(response.data.message)
            
        } catch (error) {
            toast.error(error.response.data.message || "error signing-up")

        } finally {
            set( {isSigningUp : false} )
        }
    },

    login : async(data) => {
        set( {isLoggingIn : true} );

        try {
            const response = await axiosInstance.post("/auth/login", data);

            set( {authUser : response.data.user} )

            toast.success(response.data.message)

        } catch (error) {
            set( {authUser : null});
            toast.error(error.response.data?.message || "Error logging-in");
            
        } finally {
            set( {isLoggingIn : false})
        }
    },

    logout : async() => {
        set( {isLoggingOut : true} );
        try {
            const response = await axiosInstance.get("/auth/logout");

            toast.success(response.data.message);
        } catch (error) {
            console.log("Error logging-out", error);
            toast.error("Error logging-out")
        } finally {
            set( {isLoggingOut : false} )
        }
    }
}))