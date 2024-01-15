import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/Styles/global.scss";
// import 'react-flags-select/css/react-flags-select.css'; // Import the styles

import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import EmailVerification from "./pages/EmailVerification";
import VerificationCode from "./pages/VerificationCode";
import ResetLoginPassword from "./pages/ResetLoginPassword";
import { useProSidebar } from "react-pro-sidebar";
import { AppContext } from "./Context/AppContext";
import { useEffect, useState } from "react";
import { getLocation } from "./services/CustomerHandle";

function App() {
const [gccCountriesList, setGccCountriesList] = useState([])

  useEffect(() => {
    getLocation()
      .then((data) => {
        setGccCountriesList(data);
        
      })
      .catch((error) => {
        console.log("error while fetching location", error);
      });
  }, [])

  useEffect(() => {
    const handleOnlineStatus = () => {
      if (navigator.onLine) {
        console.log('Internet connection is available.');
      } else {
        toast.error('No internet connection.')
        console.error('No internet connection.');
      }
    };

    // Add event listeners for online and offline events
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Initial check
    handleOnlineStatus();

    // Cleanup: remove event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []); 

  
  return (
    <Router>
      <AppContext.Provider value={{gccCountriesList}}>
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
      </AppContext.Provider>
    </Router>
  );
}

export default App;
