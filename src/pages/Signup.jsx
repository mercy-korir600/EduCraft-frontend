import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const showTempMessage = (text, type = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email/Password signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      return showTempMessage("Please fill all fields");
    }
    if (password !== confirmPassword) {
      return showTempMessage("Passwords do not match");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      showTempMessage("Signup successful!", "success");
      setTimeout(() => navigate("/Onboarding"), 2000);
    } catch (err) {
      showTempMessage("Signup failed: " + err.message);
    }
  };

  // Google signup
  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      showTempMessage("Google signup successful!", "success");
      navigate("/Onboarding");
    } catch (err) {
      console.error(err);
      showTempMessage("Google signup failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl px-6 py-10 w-full max-w-md sm:px-8 lg:px-10 relative">

        {message.text && (
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium z-10
            ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {message.text}
          </div>
        )}

        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-900 mb-4">
          EduCraft
        </h1>

        <h2 className="text-xl font-normal text-center text-gray-700 mb-6">
          Sign up to enjoy the best EduCraft experience
        </h2>

        <form onSubmit={handleSignup}>


          <div className="relative mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <MdMarkEmailUnread className="absolute left-3 top-3.5 text-emerald-400" />
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-xl text-gray-600 hover:text-emerald-400"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-xl text-gray-600 hover:text-emerald-400"
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-900 hover:bg-emerald-500 text-white py-3 rounded-xl font-semibold text-lg shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center text-gray-500 my-6">— or —</div>

        <button
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
          <span className="text-gray-600 font-medium">Continue with Google</span>
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link to="/Login" className="text-emerald-400 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
