import React, { useState, useEffect } from "react";
import GamePlay from '../assets/Loading/Game-Play.png';
import FocusLogo from '../assets/Loading/focus-group 2.png';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));

  // Handle individual box input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("Verifying OTP:", finalOtp);
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-[#064e3b]">
      
      {/* 1. Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: `url(${GamePlay})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* 2. Main Card */}
      <div className="z-10 w-full max-w-md px-6 py-10 mx-4 bg-black/60 backdrop-blur-xl rounded-[40px] border-2 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center">
        
        {/* Logo Section */}
        <img src={FocusLogo} alt="Logo" className="w-20 mx-auto mb-6 drop-shadow-2xl" />
        
        <h2 className="text-white text-3xl font-black italic tracking-tighter mb-2">
            VERIFY ACCOUNT
        </h2>
        
        {/* The Text you requested */}
        <p className="text-cyan-400 font-bold text-sm mb-8 animate-pulse uppercase tracking-widest">
            An OTP is sent to your Email. Please Check!
        </p>

        <form onSubmit={handleVerify} className="space-y-8">
          
          {/* OTP Input Slots */}
          <div className="flex justify-center gap-3">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-14 h-16 bg-black text-white text-center text-2xl font-black border-2 border-cyan-500/30 rounded-2xl focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          {/* Verify Button (Glossy Green) */}
          <button
            type="submit"
            className="w-full relative group transition-transform active:scale-95"
          >
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-30"></div>
            <div className="relative w-full py-4 bg-gradient-to-b from-[#00ff00] to-[#008000] border-2 border-yellow-400 rounded-full shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full scale-x-125 -translate-y-3 blur-[1px]"></div>
                <span className="relative text-black font-black text-xl italic tracking-tighter">
                  VERIFY OTP
                </span>
            </div>
          </button>

          {/* Resend Logic */}
          <div className="mt-6">
            <p className="text-white/40 text-sm font-medium">
                Did not receive the OTP?{" "}
                <button 
                  type="button"
                  className="text-yellow-500 font-black italic hover:text-yellow-400 underline underline-offset-4 cursor-pointer"
                  onClick={() => console.log("Resending...")}
                >
                    CLICK HERE
                </button>
            </p>
          </div>
        </form>
      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default VerifyOTP;