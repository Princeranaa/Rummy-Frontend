import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GamePlay from "../assets/Loading/Game-Play.png";
import FocusLogo from "../assets/Loading/focus-group 2.png";
import RummyPlay from "../assets/Loading/Frame 1261152773.png";

const Loading = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 30);
    const timer = setTimeout(() => navigate("/login"), 3500);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <>
      {/* 1. THE "PLEASE ROTATE" OVERLAY (Mobile Portrait Only) */}
      <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black text-white text-center p-10 lg:hidden landscape:hidden">
        <div className="animate-bounce mb-4 text-4xl">🔄</div>
        <h2 className="text-xl font-bold mb-2">Please Rotate Your Device</h2>
        <p className="text-sm opacity-70 text-yellow-500">
          Rummy is best played in Landscape mode!
        </p>
      </div>

      {/* 2. THE MAIN GAME UI (Hidden in Portrait Mobile) */}
      <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#064e3b]">
        {/* Background - Card Table Felt */}
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url(${GamePlay})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content Box - Max-Width for Laptops, Full width for Mobile Landscape */}
        <div className="z-10 flex flex-col items-center justify-between w-full h-full max-w-4xl py-8 px-12">
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Logo Combo - Side by side on landscape mobile, stacked on desktop */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <img
                src={FocusLogo}
                alt="Logo Icon"
                className="w-20 sm:w-24 md:w-32 drop-shadow-2xl"
              />
              <img
                src={RummyPlay}
                alt="Rummy Logo"
                className="w-48 sm:w-64 md:w-80 object-contain"
              />
            </div>
          </div>

          {/* Loading Bar Section - Stays at the bottom */}
          <div className="w-full max-w-xl">
            <div className="flex justify-between items-end mb-1">
              <span className="text-orange-500 font-black italic tracking-wider text-xs sm:text-base animate-pulse">
                LOADING GAME ASSETS...
              </span>
              <span className="text-white font-black italic text-sm sm:text-lg">
                {progress}%
              </span>
            </div>

            <div className="relative w-full h-4 sm:h-6 bg-black/60 rounded-full border border-yellow-500/50 p-[2px] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-100 shadow-[0_0_10px_#f97316]"
                style={{
                  width: `${progress}%`,
                  backgroundImage:
                    "linear-gradient(45deg, #f97316 25%, #ea580c 25%, #ea580c 50%, #f97316 50%, #f97316 75%, #ea580c 75%, #ea580c 100%)",
                  backgroundSize: "20px 20px",
                }}
              />
            </div>
            <p className="mt-2 text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
              Connection Secure | v1.0.4
            </p>
          </div>
        </div>

        {/* Bottom Vignette */}
        <div className="absolute bottom-0 w-full h-1/4 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
      </div>
    </>
  );
};
export default Loading;
