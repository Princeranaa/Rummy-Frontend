import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Utils/axios";
import { useAuth } from "../context/AuthProvider";

import GamePlayBg from "../assets/Loading/Game-Play.png";
import PoolImg from "../assets/GameSection/Pool.png";
import PointImg from "../assets/GameSection/Point.png";

const STEPS = {
  GAME_TYPE: "GAME_TYPE",
  VARIANT: "VARIANT",
  LOBBY: "LOBBY_CHOICE",
};

const GAME_OPTIONS = [
  { type: "points", image: PointImg, alt: "Point", hasVariant: false },
  { type: "pool", image: PoolImg, alt: "Pool", hasVariant: true },
];

const POOL_VARIANTS = [101, 201];

const GameType = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [step, setStep] = useState(STEPS.GAME_TYPE);
  const [selection, setSelection] = useState({ type: null, variant: null });
  const [loading, setLoading] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () =>
      setIsPortrait(window.innerHeight > window.innerWidth);

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const payload = {
    gameType: selection.type,
    poolLimit: selection.type === "pool" ? selection.variant : null,
  };

  const handleGameSelect = (game) => {
    if (game.hasVariant) {
      setStep(STEPS.VARIANT);
      return;
    }

    setSelection({ type: game.type, variant: null });
    setStep(STEPS.LOBBY);
  };

  const handleVariantSelect = (variant) => {
    setSelection({ type: "pool", variant });
    setStep(STEPS.LOBBY);
  };

  const handleBack = () => {
    if (step === STEPS.LOBBY) {
      setStep(selection.type === "pool" ? STEPS.VARIANT : STEPS.GAME_TYPE);
      return;
    }

    if (step === STEPS.VARIANT) {
      setStep(STEPS.GAME_TYPE);
    }
  };

  const callGameAPI = async (endpoint, body) => {
    if (!selection.type) return;

    setLoading(true);

    try {
      const { data } = await api.post(`/api/game/${endpoint}`, body, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (data?.roomId) navigate(`/game/${data.roomId}`);
    } catch (err) {
      alert(
        err.response?.data?.message || "Check if Backend is running on Port 5000"
      );
    } finally {
      setLoading(false);
    }
  };

  const joinGame = () => callGameAPI("select", payload);

  const createGame = () =>
    callGameAPI("createGame", {
      ...payload,
      maxPlayers: 4,
    });

  return (
    <>
      {loading && <LoadingOverlay />}
      {isPortrait && <PortraitWarning />}

      <div
        className="relative h-screen w-screen flex flex-col items-center font-sans text-white overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${GamePlayBg})` }}
      >
        <TopHud user={user} selection={selection} />

        <main className="flex-1 w-full flex items-center justify-center px-10 pb-4">
          {step === STEPS.GAME_TYPE && (
            <div className="flex flex-row gap-8 md:gap-16">
              {GAME_OPTIONS.map((game) => (
                <button
                  key={game.type}
                  onClick={() => handleGameSelect(game)}
                  className="w-[45vw] max-w-[280px] transition-transform active:scale-95"
                >
                  <img
                    src={game.image}
                    alt={game.alt}
                    className="w-full h-auto max-h-[60vh] object-contain drop-shadow-2xl"
                  />
                </button>
              ))}
            </div>
          )}

          {step === STEPS.VARIANT && (
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-8">
                {POOL_VARIANTS.map((variant) => (
                  <PoolVariantButton
                    key={variant}
                    value={variant}
                    onClick={() => handleVariantSelect(variant)}
                  />
                ))}
              </div>

              <BackButton onClick={handleBack} />
            </div>
          )}

          {step === STEPS.LOBBY && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300">
              <h2 className="text-xl md:text-3xl font-black italic text-[#FFD700] mb-8 tracking-widest uppercase drop-shadow-lg">
                READY?
              </h2>

              <div className="flex flex-row gap-8 md:gap-12">
                <ActionButton label="CREATE" variant="create" onClick={createGame} />
                <ActionButton label="JOIN" variant="join" onClick={joinGame} />
              </div>

              <BackButton onClick={handleBack} />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-t-cyan-400 border-gray-600 rounded-full animate-spin mb-4" />
      <p className="text-cyan-400 font-black italic tracking-widest animate-pulse uppercase">
        Connecting to Server...
      </p>
    </div>
  </div>
);

const PortraitWarning = () => (
  <div className="fixed inset-0 z-[100] bg-[#004d3d] flex flex-col items-center justify-center text-white">
    <span className="text-4xl animate-bounce mb-4">🔄</span>
    <p className="font-black italic uppercase">Rotate for Landscape</p>
  </div>
);

const TopHud = ({ user, selection }) => {
  const fullName = `${user?.fullname?.firstname || ""} ${
    user?.fullname?.lastname || ""
  }`;

  return (
    <div className="w-full flex justify-between items-center px-4 py-2">
      <div className="bg-black/50 border border-cyan-500/30 px-4 py-1.5 rounded-full flex items-center">
        <div className="w-8 h-8 rounded-full border border-cyan-400 mr-2 overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/de/98/76/de98765ff1129a9eff70ebebc2385297.jpg"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <span className="text-[10px] font-black italic uppercase tracking-tighter">
          {fullName}
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
  );
};

const PoolVariantButton = ({ value, onClick }) => (
  <button
    onClick={onClick}
    className="group relative w-28 h-28 md:w-44 md:h-44 bg-linear-to-tr from-cyan-600 to-cyan-400 rounded-3xl border-4 border-yellow-500 flex flex-col items-center justify-center shadow-2xl active:scale-90 transition-all"
  >
    <span className="text-4xl md:text-6xl font-black text-white group-hover:scale-110">
      +
    </span>

    <div className="absolute bottom-0 w-full bg-green-600 py-2 md:py-3 rounded-b-3xl text-center font-black text-xs md:text-xl uppercase">
      {value}
    </div>
  </button>
);

const ActionButton = ({ label, variant, onClick }) => {
  const styles =
    variant === "create"
      ? "from-orange-600 to-yellow-500 border-orange-900"
      : "from-cyan-600 to-blue-600 border-blue-900";

  return (
    <button
      onClick={onClick}
      className={`w-40 h-16 md:w-56 md:h-20 bg-linear-to-r ${styles} rounded-2xl border-b-4 shadow-2xl active:scale-95 flex items-center justify-center`}
    >
      <span className="text-lg md:text-2xl font-black italic text-white drop-shadow-md">
        {label}
      </span>
    </button>
  );
};

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-8 text-[10px] font-black opacity-50 uppercase tracking-widest"
  >
    ← Back
  </button>
);

export default GameType;