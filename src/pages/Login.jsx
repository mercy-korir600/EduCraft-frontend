import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdMarkEmailUnread, MdLockOutline } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

const from = location.state?.from?.pathname || "/onboarding";

  const showTempMessage = (text, type = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) return showTempMessage("Please fill in all fields.");

  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, password);

    showTempMessage("Welcome back!", "success");

    setTimeout(() => navigate(from, { replace: true }), 1000);
  } catch (err) {
    showTempMessage("Invalid email or password.");
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    navigate(from, { replace: true });
  } catch (err) {
    showTempMessage("Google sign-in failed.");
  }
};

  return (
    <PageWrapper>
      <div className="min-h-screen font-sans flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-slate-900 dark:to-emerald-950 p-4 transition-colors duration-500">
        
        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-md border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden">
          
          {/* Animated Message Toast */}
          {message.text && (
            <div className={`absolute top-0 left-0 w-full p-3 text-center text-sm font-bold transition-all animate-pulse
              ${message.type === "error" ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
              {message.text}
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200 mb-2">
              EduCraft
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
                />
                <MdMarkEmailUnread className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-1.5 ml-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Log in"}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200 dark:border-slate-700"></span></div>
            <span className="relative px-4 bg-white dark:bg-slate-900 text-sm text-slate-400 uppercase tracking-widest">or</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border-2 border-slate-100 dark:border-slate-700 py-3 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
          >
            <FcGoogle size={24} />
            <span className="text-slate-700 dark:text-slate-300 font-bold group-hover:text-emerald-600 transition-colors">
              Continue with Google
            </span>
          </button>

          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-8">
            New to EduCraft?{" "}
            <Link to="/signup" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-all">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;