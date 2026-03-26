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

    const timer = setTimeout(() => {
      navigate("/login");
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-[#064e3b]">
      {/* 1. Background - Fixed cover to prevent stretching on mobile rotate */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${GamePlay})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content Container - Responsive width based on device */}
      <div className="z-10 flex flex-col items-center w-full px-8 sm:max-w-md md:max-w-lg lg:max-w-xl text-center">
        {/* 2. Logo Area - Scaling based on screen height and width */}
        <div className="relative mb-6 md:mb-12 animate-pulse">
          {/* Round Purple Logo - Smaller on mobile, larger on Tab/Laptop */}
          <img
            src={FocusLogo}
            alt="Logo Icon"
            className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 mx-auto mb-4 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          />
          {/* Rummy Text Logo - Fluid width */}
          <img
            src={RummyPlay}
            alt="Rummy Earn While You Play"
            className="w-56 sm:w-72 md:w-96 lg:w-[450px] h-auto object-contain"
          />
        </div>

        {/* 3. Progress Section - Pushed down slightly on larger screens */}
        <div className="w-full mt-8 md:mt-16 max-w-sm md:max-w-md">
          <div className="flex justify-start mb-2 px-1">
            <span className="text-orange-500 font-extrabold text-base sm:text-lg md:text-2xl italic tracking-tighter animate-bounce">
              LOADING...
            </span>
          </div>

          {/* Custom Progress Bar - Thicker on Desktop, slimmer on Mobile */}
          <div className="relative w-full h-5 sm:h-7 md:h-8 bg-black/60 rounded-full border-[1.5px] md:border-2 border-yellow-500/60 shadow-inner overflow-hidden p-[2px] md:p-1">
            <div
              className="h-full rounded-full transition-all duration-100 ease-out shadow-[0_0_15px_rgba(249,115,22,0.5)]"
              style={{
                width: `${progress}%`,
                backgroundImage:
                  "linear-gradient(45deg, #f97316 25%, #ea580c 25%, #ea580c 50%, #f97316 50%, #f97316 75%, #ea580c 75%, #ea580c 100%)",
                backgroundSize: "30px 30px",
              }}
            />
          </div>

          {/* Percentage Text */}
          <div className="flex justify-between items-center mt-2 px-1">
            <p className="text-white/50 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Optimizing Assets
            </p>
            <p className="text-white text-xs md:text-lg font-black italic">
              {progress}%
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Glow - Stronger on mobile for depth */}
      <div className="absolute bottom-0 w-full h-24 md:h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
};

export default Loading;
