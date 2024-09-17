import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/client/Home";
import Courses from "./pages/client/Courses";
import preloader from "../src/clientassets/images/preloader.gif";
import { AuthProvider } from "./components/context/AuthContext";
import Profile from "./pages/client/Profile";
import Enrollment from "./pages/client/Enrollment";
import Chapters from "./pages/client/Chapters";
import PrivateRoutes from "../utils/PrivateRoutes";
import CourseDetail from "./pages/client/CourseDetail";
import Error404 from "./pages/client/Error404";


const Preloader = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="preloader">
      <img src={preloader} alt="preloader" />
    </div>
  );
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Detects route changes

  useEffect(() => {
    // Show the loader when the route changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust the timeout as needed

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, [location]); // Triggers on every route change

  return (
    <>
      <AuthProvider>
        <Preloader isLoading={isLoading} />
        {!isLoading && (
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/coursedetail/:course_id" element={<CourseDetail />} />

            <Route element={<PrivateRoutes />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route path="/chapters/:course_id" element={<Chapters />} />
            </Route>
          </Routes>
        )}
      </AuthProvider>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
