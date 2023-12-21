import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/Styles/global.scss";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import VerificationCode from "./pages/VerificationCode";
import ResetLoginPassword from "./pages/ResetLoginPassword";
import { useProSidebar } from "react-pro-sidebar";

function App() {
  return (
    <Router>
      <div className="page">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route
            path="/verification/:id/:userId"
            element={<VerificationCode />}
          />
          <Route path="/resetpassword/:id" element={<ResetLoginPassword />} />
          <Route path="/*" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
