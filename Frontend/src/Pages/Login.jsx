import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../Stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Enter a valid mail"),
  password: z.string().min(6, "Password must be minimum of 6 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoggingIn } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/");
    } catch (error) {
      console.log("Error logging-in");
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-stretch lg:min-h-140">
          <section className="hidden lg:flex flex-col justify-between rounded-4xl border border-white/10 bg-slate-900/80 p-12 shadow-2xl backdrop-blur-xl text-white h-full">
            <div>
              <span className="inline-flex rounded-full bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-200 mb-6">
                Secure access for your portfolio hub
              </span>
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-white">
                Sign in and keep your portfolio momentum going.
              </h1>
              <p className="mt-6 max-w-xl text-slate-300 sm:text-lg">
                Access your profile, manage projects, and share your best work
                with confidence.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-slate-300">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">Fast onboarding</p>
                <p className="mt-2 text-slate-400">
                  Login quickly and jump straight into your portfolio editing
                  workspace.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">Consistent design</p>
                <p className="mt-2 text-slate-400">
                  The layout is polished and balanced to match the rest of your
                  app.
                </p>
              </div>
            </div>
          </section>

          <article className="flex h-full flex-col rounded-4xl border border-white/10 bg-slate-950/95 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-violet-300/80">
                Welcome back
              </p>
              <h2 className="mt-4 text-4xl font-semibold text-white">
                Log in to your account
              </h2>
              <p className="mt-3 text-sm text-slate-400 sm:text-base">
                Enter your credentials to continue building your portfolio and
                manage your profile.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-1 flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-200"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Mail className="h-5 w-5" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={`input input-bordered w-full rounded-3xl border-slate-700/80 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 ${errors.email ? "input-error" : ""}`}
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
                      className={`input input-bordered w-full rounded-3xl border-slate-700/80 bg-slate-950/90 px-12 py-4 text-slate-100 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20 ${errors.password ? "input-error" : ""}`}
                      placeholder="Enter your password"
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
                className="mt-4 btn w-full rounded-3xl bg-linear-to-r from-violet-500 to-indigo-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:shadow-xl"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-violet-300 transition hover:text-violet-200"
              >
                Sign up
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Login;
