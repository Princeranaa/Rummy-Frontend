import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Loading from "./Pages/Loading";
import VerifyOTP from "./Pages/VerifyOtp";
import ProtectedRoute from "./Private/ProtectedRoute";
import GameType from "./GamesLobbys/GameType";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/VerifyOtp" element={<VerifyOTP />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/game" element={<GameType />} />
          {/* <Route path="/dashboard" element={<GameType />} /> */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
