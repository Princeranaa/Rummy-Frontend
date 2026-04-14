import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import GamePlay from "../assets/Loading/Game-Play.png";
import FocusLogo from "../assets/Loading/focus-group 2.png";
import api from "../Utils/axios";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value.slice(-1);
    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const otpString = otp.join("");
    console.log("OTP:", otpString);

    if (otpString.length < 6) {
      setError("Please enter the full 6-digit code.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        "/api/v1/verifyOtp",
        {
          email: email,
          otp: otpString,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        console.log("Verified!", response.data.user);
        navigate("/game");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Verification failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;
    const newOtp = pasteData.split("");
    setOtp(newOtp);
  };

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleVerify(new Event("submit"));
    }
  }, [otp]);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="z-10 w-full max-w-md px-6 py-10 mx-4 rounded-[40px] text-center">
        <img
          src={FocusLogo}
          alt="Logo"
          className="w-20 mx-auto mb-6 drop-shadow-2xl"
        />

        <h2 className="text-white text-3xl font-black italic tracking-tighter mb-2">
          VERIFY ACCOUNT
        </h2>

        <p className="text-cyan-400 font-bold text-xs mb-2 uppercase tracking-widest">
          An OTP is sent to {email || "your Email"}.
        </p>
        <p className="text-white/60 text-[10px] mb-8 italic">
          Please check your inbox!
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className={`w-14 h-16 bg-black text-white text-center text-2xl font-black border-2 rounded-2xl outline-none transition-all ${
                  error
                    ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                    : "border-cyan-500/30 focus:border-cyan-400"
                }`}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                onKeyDown={(e) => handleKeyDown(e, index)}
                disabled={loading}
                onPaste={handlePaste}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold animate-shake">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full relative group transition-transform active:scale-95 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-30"></div>
            <div className="relative w-full py-4 bg-linear-to-b from-[#00ff00] to-[#008000] border-2 border-yellow-400 rounded-full shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full scale-x-125 -translate-y-3 blur-[1px]"></div>
              <span className="relative text-black font-black text-xl italic tracking-tighter uppercase">
                {loading ? "Verifying..." : "Verify OTP"}
              </span>
            </div>
          </button>

          <div className="mt-6">
            <p className="text-white/40 text-sm font-medium">
              Did not receive the OTP?{" "}
              <button
                type="button"
                className="text-yellow-500 font-black italic hover:text-yellow-400 underline underline-offset-4"
                onClick={() => {
                  /* Call your Resend API here */
                }}
              >
                CLICK HERE
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
