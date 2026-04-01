import React, { useState } from "react";
import GamePlay from "../assets/Loading/Game-Play.png";
import FocusLogo from "../assets/Loading/focus-group 2.png";
import RummyPlay from "../assets/Loading/Frame 1261152773.png";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registering User:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        {
          email: formData.email,
          fullname: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(response.data.message || "User registered successfully!");
      navigate("/VerifyOtp", {
        state: { email: formData.email },
      });

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("something went wrong", error);
      if (error.response) {
        // Server-side error
        toast.error(
          error.response.data.message ||
            "Registration failed. Please try again.",
        );
      } else {
        // Network or other error
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden font-sans">
      {/* 1. Background Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 2. Orientation Warning (Same as Loading) */}
      <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black text-white text-center p-10 lg:hidden landscape:hidden">
        <div className="animate-bounce mb-4 text-4xl">🔄</div>
        <h2 className="text-xl font-bold italic">ROTATE FOR BEST EXPERIENCE</h2>
      </div>

      {/* 3. Main Container */}
      <div className="z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 md:px-12 py-10 gap-10">
        {/* Left Side: Branding */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 space-y-6">
          <img
            src={FocusLogo}
            alt="Logo"
            className="w-24 md:w-40 drop-shadow-2xl animate-pulse"
          />
          <img
            src={RummyPlay}
            alt="Rummy Title"
            className="w-64 md:w-96 object-contain"
          />
          <p className="text-yellow-500 font-black italic tracking-widest text-lg hidden md:block">
            JOIN THE ULTIMATE TABLE
          </p>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <h2 className="text-white text-2xl font-black italic mb-6 text-center tracking-wide">
            CREATE ACCOUNT
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Row */}
            <div className="flex gap-3">
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-black text-white border border-cyan-400/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-gray-500 shadow-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                  required
                />
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-black text-white border border-cyan-400/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-gray-500 shadow-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-black text-white border border-cyan-400/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-gray-500 shadow-lg"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            {/* Password Input */}
            <input
              type="password"
              placeholder="Set Password"
              className="w-full bg-black text-white border border-cyan-400/50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-gray-500 shadow-lg"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            {/* Submit Button (Glossy Green style from image) */}
            <button
              type="submit"
              className="w-full mt-4 group relative flex items-center justify-center transition-transform active:scale-95"
            >
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-50"></div>
              <div className="relative w-full py-3 bg-linear-to-b from-[#00ff00] to-[#008000] border-2 border-yellow-400 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)] overflow-hidden">
                {/* Glossy Overlay */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full scale-x-110 -translate-y-2 blur-[1px]"></div>
                <span className="relative text-black font-black text-xl italic tracking-tighter">
                  REGISTER
                </span>
              </div>
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => (window.location.href = "/login")}
                className="text-white/60 text-xs hover:text-cyan-400 underline underline-offset-4 uppercase font-bold tracking-widest"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 w-full h-32 bg-linear-to-t from-black to-transparent pointer-events-none opacity-60" />
    </div>
  );
};

export default Register;
