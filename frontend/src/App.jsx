import { Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/Login/SignUpPage";
import UserDashboard from "./pages/Login/UserDashboard";
import PublicReportScreening from "./pages/ReportsScreens/PublicReportScreening";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";

import { Toaster } from "react-hot-toast"

function App() {
  const {checkAuth, isCheckingAuth,authUser} = useAuthStore();

  useEffect(() =>{
    checkAuth();
  },[checkAuth]);

  console.log({ authUser })

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen relative overflow-hidden">
      
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />

      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />


      <Routes>
        <Route path="/" element={authUser ? <UserDashboard /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/new-report" element={<PublicReportScreening />} />
      </Routes>

    <Toaster />

    </div>
  );
}

export default App;