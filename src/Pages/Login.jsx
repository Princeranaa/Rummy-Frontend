import React, { useState } from "react";
import GamePlay from "../assets/Loading/Game-Play.png";
import FocusLogo from "../assets/Loading/focus-group 2.png";
import RummyPlay from "../assets/Loading/Frame 1261152773.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data.message || "Login successful");
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-[#064e3b]">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Main Container */}
      <div className="z-10 flex flex-col landscape:flex-row items-center justify-center lg:justify-between w-full max-w-350 px-4 sm:px-10 lg:px-20 py-4 gap-6 lg:gap-20">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center w-full landscape:w-1/2 max-w-lg space-y-3 lg:space-y-6">
          <img
            src={FocusLogo}
            alt="Logo"
            className="w-20 sm:w-24 lg:w-32 drop-shadow-2xl"
          />
          <img
            src={RummyPlay}
            alt="Rummy Title"
            className="w-56 sm:w-72 lg:w-120 object-contain drop-shadow-lg"
          />
          <div className="h-0.5 w-32 lg:w-64 bg-linear-to-r from-transparent via-yellow-500 to-transparent opacity-80"></div>
          <p className="text-white/70 font-black italic tracking-[0.2em] text-[10px] sm:text-xs lg:text-sm uppercase">
            Welcome Back Player
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-100 lg:w-112.5 p-4 sm:p-8">
          <h2 className="text-white text-2xl lg:text-3xl font-black italic mb-4 lg:mb-8 text-center tracking-tighter">
            LOGIN
          </h2>

          <form onSubmit={handleLogin} className="space-y-3 lg:space-y-5">
            {/* Email */}
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-black/60 text-white border-2 border-cyan-500/20 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-black/60 text-white border-2 border-cyan-500/20 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 relative ${loading ? "opacity-50" : ""}`}
            >
              <div className="w-full py-3 bg-green-500 rounded-full text-black font-bold">
                {loading ? "AUTHENTICATING..." : "START PLAYING"}
              </div>
            </button>

            {/* Links */}
            <div className="flex flex-col gap-2 pt-4 items-center">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-yellow-500 text-xs"
              >
                New Player? Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
