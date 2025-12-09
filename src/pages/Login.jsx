import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdMarkEmailUnread } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const showTempMessage = (text, type = "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 2000);
  };

  // Email + Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return showTempMessage("Please fill in all fields.");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showTempMessage("Login successful!", "success");
      setTimeout(() => navigate("/onboarding"), 1500);
    } catch (err) {
      showTempMessage("Invalid email or password.");
    }
  };

  //  Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      showTempMessage("Google login successful!", "success");
      navigate("/onboarding");
    } catch (err) {
      console.error(err);
      showTempMessage("Google login failed: " + err.message);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-200 p-4">
        <div className="bg-white shadow-2xl rounded-2xl px-6 py-10 w-full max-w-md relative">

          {message.text && (
            <div
              className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-sm font-medium
              ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
            >
              {message.text}
            </div>
          )}

          <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-900 mb-4">
            EduCraft
          </h1>

          <h2 className="text-2xl font-bold text-center mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="relative mb-6">
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pr-12 pl-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <MdMarkEmailUnread className="absolute right-3 top-10 text-xl text-emerald-400" />
            </div>

            {/* Password */}
            <div className="relative mb-6">
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pr-12 pl-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-xl text-gray-600 hover:text-emerald-400"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-900 text-white py-3 rounded-xl font-semibold text-lg"
            >
              Log in
            </button>
          </form>

          <div className="text-center text-gray-500 my-6">— or —</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-600 font-medium">
              Login with Google
            </span>
          </button>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-emerald-500 font-semibold hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
