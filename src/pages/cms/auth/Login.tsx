import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginBanner from "../../../assets/images/loginBanner.jpg";
import { login } from "../../../utils/apiUtility";
import { useUserContext } from "../../../hooks/UseUserContext";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { getErrorMessage } from "../../../services/axios";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const { login: saveData } = useUserContext();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      const { token, user, metrics } = data;
      if (token && user && metrics) {
        saveData(token, user, metrics);
        toast.success("Log in successful");
        navigate("/admin/overview");
      } else {
        toast.error("Invalid response data");
      }
    },
    onError: (error) => {
      const errMsg = getErrorMessage(error);
      toast.error(errMsg);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-10 xl:p-16 min-h-screen bg-white">
        <div className="w-full max-w-md mx-auto my-auto py-8 flex flex-col justify-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-black tracking-tight text-neutral-900">
              Welcome back, Administrator
            </h1>
            <p className="text-sm text-neutral-500 font-body">
              Access your editorial dashboard to manage articles, media assets,
              users, and publication analytics with confidence and
              security.{" "}
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 mt-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-body block">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 bg-neutral-50 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500 focus:ring-red-100"
                      : "border-neutral-200 focus:border-primary focus:ring-red-50"
                  } rounded-lg text-neutral-900 placeholder-neutral-440 focus:outline-none focus:ring-3 transition duration-200 text-sm font-body`}
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 pl-1 text-xs font-medium font-body flex items-center gap-1 mt-0.5">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 font-body block">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-3 pr-12 bg-neutral-50 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:ring-red-100"
                      : "border-neutral-200 focus:border-primary focus:ring-red-50"
                  } rounded-lg text-neutral-900 placeholder-neutral-440 focus:outline-none focus:ring-3 transition duration-200 text-sm font-body`}
                />

                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-neutral-600 p-1 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </span>
              </div>

              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 pl-1 text-xs font-medium font-body flex items-center gap-1 mt-0.5">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!formik.isValid || loginMutation.isPending}
              className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 px-4 rounded-lg shadow-lg shadow-red-500/10 hover:shadow-red-500/20 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 text-sm font-body"
            >
              {loginMutation.isPending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>
        </div>

        <div className="text-xs text-neutral-450 font-body">
          &copy; {new Date().getFullYear()} Splashing News. All rights reserved.
        </div>
      </div>

      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%] relative overflow-hidden bg-neutral-950 items-center justify-center">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={loginBanner}
            alt="Splashing News Editorial Room"
            className="w-full h-full object-cover transition-transform duration-10000 ease-out hover:scale-105 select-none"
          />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/30 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-neutral-950/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-neutral-950/50" />
        </div>

        <div className="absolute bottom-16 left-16 right-16 max-w-xl text-white z-10 space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-heading font-bold leading-tight tracking-tight text-white!">
              Empowering the voices that shape global stories.
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed font-light font-body">
              Manage breaking alerts, draft rich stories, coordinate layout
              assets, and analyze publication performance across our worldwide
              readership.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
