import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMarkEmailUnread } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { auth, provider, signInWithPopup } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logostud from "../assets/logostud.jpg"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const showTempMessage = (text, type = 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return showTempMessage("Please fill in all fields.");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showTempMessage("Login successful!", "success");
      // Redirect to onboarding page instead of dashboard
      setTimeout(() => navigate("/onboarding"), 2000);
    } catch (err) {
      showTempMessage("Invalid credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      showTempMessage("Google login successful!", "success");
      // Redirect to onboarding page instead of dashboard
      setTimeout(() => navigate("/onboarding"), 2000);
    } catch (err) {
      showTempMessage("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-200 via-fuchsia-300 p-4">
      <div className="bg-white shadow-2xl rounded-2xl px-6 py-10 w-full max-w-md sm:px-8 lg:px-10 relative">

        {/* Alert */}
        {message.text && (
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium z-10
            ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}
        {/* 🔵 Title */}
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-rose-500 animate-glow mb-4">
          EduCraft
        </h1>

        {/* 🔵 Full-width image */}
        <img
          src={logostud}
          alt="Logo"
          className="w-full h-40 object-cover mb-6"
        />

        <h2 className="text-2xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-rose-500 animate-glow mb-4">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="relative mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pr-12 pl-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <MdMarkEmailUnread className="absolute right-3 top-10 text-xl text-emerald-400" />
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-4 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
      
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-xl text-gray-600 hover:text-emerald-400"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-400 via-fuchsia-500 to-rose-500 animate-glow hover:bg-emerald-400 transition text-white py-3 rounded-xl font-semibold text-lg shadow-md"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 my-6">— or —</div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
          <span className="text-gray-600 font-medium">Login with Google</span>
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-400 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;