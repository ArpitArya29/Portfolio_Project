import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../Stores/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";

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
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-stretch lg:min-h-140">
          <section className="hidden lg:flex flex-col justify-between rounded-4xl border border-white/10 bg-slate-900/80 p-12 shadow-2xl backdrop-blur-xl text-white h-full">
            <div>
              <span className="inline-flex rounded-full bg-pink-500/15 px-4 py-2 text-sm font-medium text-pink-200 mb-6">
                Create your portfolio identity
              </span>
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white">
                Register and launch your story.
              </h1>
              <p className="mt-6 max-w-xl text-slate-300 sm:text-lg">
                Start with an account built for creators. Upload a profile
                image, shape your brand, and join your portfolio ecosystem.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-slate-300">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">
                  Professional presence
                </p>
                <p className="mt-2 text-slate-400">
                  Share a polished profile that matches the premium portfolio
                  layout.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">Fast setup</p>
                <p className="mt-2 text-slate-400">
                  A clean registration flow keeps the focus on getting you into
                  the app quickly.
                </p>
              </div>
            </div>
          </section>

          <article className="flex h-full flex-col rounded-4xl border border-white/10 bg-slate-950/95 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-pink-300/80">
                Create account
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-white">
                Register your portfolio profile
              </h2>
              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Add your name, email and optional avatar to start building your
                personal showcase.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-slate-200"
                      htmlFor="name"
                    >
                      Full name
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <User className="h-5 w-5" />
                      </span>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className={`input input-bordered w-full rounded-3xl border-slate-700/80 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20 ${errors.name ? "input-error" : ""}`}
                        placeholder="Your name"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Profile image
                    </label>
                    <div
                      className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-700/80 bg-slate-900 transition hover:border-pink-400"
                      onClick={() =>
                        document.getElementById("imageUpload").click()
                      }
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Avatar preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-center text-xs font-medium text-slate-400 transition group-hover:text-pink-300">
                          Upload
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

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-200"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Mail className="h-5 w-5" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`input input-bordered w-full rounded-3xl border-slate-700/80 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20 ${errors.email ? "input-error" : ""}`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-200"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Lock className="h-5 w-5" />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className={`input input-bordered w-full rounded-3xl border-slate-700/80 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20 ${errors.password ? "input-error" : ""}`}
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 btn w-full rounded-3xl bg-linear-to-r from-pink-500 to-fuchsia-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:shadow-xl"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-pink-300 transition hover:text-pink-200"
              >
                Log in
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Signup;
