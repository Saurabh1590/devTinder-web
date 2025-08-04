// src/components/Body.jsx - CORRECTED

// src/components/Body.jsx - FINAL CORRECTED VERSION
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
      return;
    }

    // Define which routes are public and don't require a login check to view.
    const publicRoutes = ['/', '/login'];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    const checkUserSession = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (error) {
        console.log("No active session found.");
        // THIS IS THE CRITICAL FIX:
        // If the session check fails AND the user is trying to access a protected page,
        // redirect them to the login page.
        if (!isPublicRoute && error?.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        // No matter the outcome, the check is complete.
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [location.pathname]); // Rerun this logic if the user navigates before the initial check is done.

  // While the initial check is running, show a full-screen loader.
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Once the check is done, render the app.
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
