import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { useAuthStore } from "../Stores/useAuthStore";

import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be minimum of 6 characters"),
  image: z.any().optional(),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const { isSigningUp, signUp } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    console.log("Signup data", data);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await signUp(formData);
      navigate("/login");
    } catch (error) {
      console.log("Error signing in", error);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-base-100">
        <div className="m-4 text-center">
          <h1 className="text-2xl font-bold mt-2">Welcome</h1>
          <p className="text-base-content/60">Sign Up to your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <div className="flex gap-4 justify-between">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-5 pointer-events-none">
                  <User className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  {...register("name")}
                  className={`input input-bordered w-full pl-10 ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Avater Upload */}
            <div className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full border-2 border-dashed, border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden hover:border-primary transition"
                onClick={() => document.getElementById("imageUpload").click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-400 text-center px-2">
                    Image
                  </span>
                )}
              </div>

              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                {...register("image")}
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* {Email} */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-5 pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                {...register("email")}
                className={`input input-bordered w-full pl-10 ${
                  errors.email ? "input-error" : ""
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-5 pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`input input-bordered w-full pl-10 ${
                  errors.password ? "input-error" : ""
                }`}
                placeholder="*********"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-full mt-5"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to={"/login"} className="link link-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
