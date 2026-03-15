import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdMarkEmailUnread, MdLockOutline } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import PageWrapper from "../components/PageWrapper";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const showTempMessage = (text, type = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      return showTempMessage("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return showTempMessage("Passwords do not match");
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showTempMessage("Account created successfully!", "success");
      setTimeout(() => navigate("/Onboarding"), 1500);
    } catch (err) {
      showTempMessage(err.message.replace("Firebase:", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/Onboarding");
    } catch (err) {
      showTempMessage("Google signup failed.");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen font-sans flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-slate-900 dark:to-emerald-950 p-4 transition-colors duration-500">
        
        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-lg border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden">
          
          {/* Status Message */}
          {message.text && (
            <div className={`absolute top-0 left-0 w-full p-3 text-center text-sm font-bold animate-slide-down
              ${message.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
              {message.text}
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200 mb-2">
              EduCraft
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">
              Join thousands of students mastering their future.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Jane"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                />
                <MdMarkEmailUnread className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                />
                <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                />
                <MdLockOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-700"></span></div>
            <span className="relative px-4 bg-white dark:bg-slate-900 text-sm text-slate-400 uppercase tracking-widest">or</span>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full border-2 border-slate-100 dark:border-slate-700 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
          >
            <FcGoogle size={24} />
            <span className="text-slate-700 dark:text-slate-300 font-bold group-hover:text-emerald-600 transition-colors">
              Sign up with Google
            </span>
          </button>

          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-8">
            Already have an account?{" "}
            <Link to="/Login" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Signup;