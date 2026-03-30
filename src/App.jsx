import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Loading from "./Pages/Loading";
import VerifyOTP from "./Pages/VerifyOtp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/VerifyOtp" element={<VerifyOTP />} />
      </Routes>
    </>
  );
}

export default App;
