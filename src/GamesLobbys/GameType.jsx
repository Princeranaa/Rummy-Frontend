import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 1. Ensure axios is imported

// Assets
import GamePlayBg from "../assets/Loading/Game-Play.png";
import PoolImg from "../assets/GameSection/Pool.png";
import PointImg from "../assets/GameSection/Point.png";

const GameType = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("GAME_TYPE");
  const [selection, setSelection] = useState({ type: null, variant: null });
  const [loading, setLoading] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  // Set your Backend URL here
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    const check = () => setIsPortrait(window.innerHeight > window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const callGameAPI = async (endpoint, body) => {
    setLoading(true);
    try {
      // 2. Added full URL and corrected axios configuration
      const response = await axios.post(
        `${API_URL}/api/game/${endpoint}`,
        body,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      console.log(response);

      if (response.data && response.data.roomId) {
        // Move to the room - The next screen will handle the Socket.io 'joinGame' event
        navigate(`/game/${response.data.roomId}`);
      }
    } catch (err) {
      console.error("Connection Error:", err);
      // Detailed error logging to avoid generic "Server connection failed"
      const errorMsg =
        err.response?.data?.message ||
        "Check if Backend is running on Port 5000";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- UI TRIGGERS ---
  const triggerJoinGame = () => {
    // 3. Mapping 'pool' + '101' to 'pool101' as per your Postman test
    const formattedType = selection.variant
      ? `${selection.type}${selection.variant}`
      : selection.type;

    callGameAPI("select", {
      gameType: formattedType,
      poolLimit: selection.variant,
    });
  };

  const triggerCreateGame = () => {
    const formattedType = selection.variant
      ? `${selection.type}${selection.variant}`
      : selection.type;

    callGameAPI("createGame", {
      gameType: formattedType,
      poolLimit: selection.variant,
      maxPlayers: 4,
    });
  };

  return (
    <>
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-cyan-400 border-gray-600 rounded-full animate-spin mb-4" />
            <p className="text-cyan-400 font-black italic tracking-widest animate-pulse uppercase">
              Connecting to Server...
            </p>
          </div>
        </div>
      )}

      {/* PORTRAIT WARNING */}
      {isPortrait && (
        <div className="fixed inset-0 z-[100] bg-[#004d3d] flex flex-col items-center justify-center text-white">
          <span className="text-4xl animate-bounce mb-4">🔄</span>
          <p className="font-black italic uppercase">Rotate for Landscape</p>
        </div>
      )}

      <div
        className="relative h-screen w-screen flex flex-col items-center font-sans text-white overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${GamePlayBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* TOP HUD */}
        <div className="w-full flex justify-between items-center px-4 py-2">
          <div className="bg-black/50 border border-cyan-500/30 px-4 py-1.5 rounded-full flex items-center">
            <div className="w-8 h-8 rounded-full border border-cyan-400 mr-2 bg-gray-800" />
            <span className="text-[10px] font-black italic uppercase tracking-tighter">
              Rahul Patel
            </span>
          </div>
          <div className="bg-black/50 px-4 py-1.5 rounded-full border border-cyan-500/30 text-xs font-black italic">
            {selection.type
              ? `${selection.type.toUpperCase()} ${selection.variant || ""}`
              : "SELECT GAME"}
          </div>
          <div className="w-10 h-10 bg-black/50 rounded-full border border-cyan-500/30 flex items-center justify-center">
            ☰
          </div>
        </div>

        {/* MAIN STAGE */}
        <div className="flex-1 w-full flex items-center justify-center px-10 pb-4">
          {step === "GAME_TYPE" && (
            <div className="flex flex-row gap-8 md:gap-16">
              <button
                onClick={() => {
                  setSelection({ type: "point", variant: null });
                  setStep("LOBBY_CHOICE");
                }}
                className="w-[45vw] max-w-[280px] transition-transform active:scale-95"
              >
                <img
                  src={PointImg}
                  alt="Point"
                  className="w-full h-auto max-h-[60vh] object-contain drop-shadow-2xl"
                />
              </button>
              <button
                onClick={() => setStep("VARIANT")}
                className="w-[45vw] max-w-[280px] transition-transform active:scale-95"
              >
                <img
                  src={PoolImg}
                  alt="Pool"
                  className="w-full h-auto max-h-[60vh] object-contain drop-shadow-2xl"
                />
              </button>
            </div>
          )}

          {step === "VARIANT" && (
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-8">
                {[101, 201].map((val) => (
                  <button
                    key={val}
                    onClick={() => {
                      setSelection({ type: "pool", variant: val });
                      setStep("LOBBY_CHOICE");
                    }}
                    className="group relative w-28 h-28 md:w-44 md:h-44 bg-gradient-to-tr from-cyan-600 to-cyan-400 rounded-3xl border-4 border-yellow-500 flex flex-col items-center justify-center shadow-2xl active:scale-90 transition-all"
                    
                  >
                    <span className="text-4xl md:text-6xl font-black text-white group-hover:scale-110">
                      +
                    </span>
                    <div className="absolute bottom-0 w-full bg-green-600 py-2 md:py-3 rounded-b-[1.5rem] text-center font-black text-xs md:text-xl uppercase">
                      {val}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("GAME_TYPE")}
                className="mt-8 text-[10px] font-black opacity-50 uppercase tracking-widest"
              >
                ← Back
              </button>
            </div>
          )}

          {step === "LOBBY_CHOICE" && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
              <h2 className="text-xl md:text-3xl font-black italic text-[#FFD700] mb-8 tracking-widest uppercase drop-shadow-lg">
                READY?
              </h2>
              <div className="flex flex-row gap-8 md:gap-12">
                <button
                  onClick={triggerCreateGame}
                  className="w-40 h-16 md:w-56 md:h-20 bg-gradient-to-r from-orange-600 to-yellow-500 rounded-2xl border-b-4 border-orange-900 shadow-2xl active:scale-95 flex items-center justify-center"
                >
                  <span className="text-lg md:text-2xl font-black italic text-white drop-shadow-md">
                    CREATE
                  </span>
                </button>
                <button
                  onClick={triggerJoinGame}
                  className="w-40 h-16 md:w-56 md:h-20 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl border-b-4 border-blue-900 shadow-2xl active:scale-95 flex items-center justify-center"
                >
                  <span className="text-lg md:text-2xl font-black italic text-white drop-shadow-md">
                    JOIN
                  </span>
                </button>
              </div>
              <button
                onClick={() =>
                  setStep(selection.type === "pool" ? "VARIANT" : "GAME_TYPE")
                }
                className="mt-8 text-[10px] font-black opacity-50 uppercase tracking-widest"
              >
                ← Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GameType;
