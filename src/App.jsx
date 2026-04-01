import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Loading from "./Pages/Loading";
import VerifyOTP from "./Pages/VerifyOtp";
import ProtectedRoute from "./Private/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/VerifyOtp" element={<VerifyOTP />} />

        {/*  Protected Routes Group */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/profile" element={<Profile />} />
        <Route path="/game" element={<Game />} />
        <Route path="/table/:id" element={<GameTable />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
