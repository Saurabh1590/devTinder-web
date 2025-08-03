// src/components/Body.jsx - CORRECTED

import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // 1. Import useLocation
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // 2. Get the current location
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      // 4. IMPORTANT: Correctly check for the 401 status code
      // Axios error status is on err.response.status
      if (err?.response?.status === 401) {
        // Only navigate to login if the user was trying to access a protected page
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    // 3. Define public routes where we should NOT try to fetch a user
    const publicRoutes = ["/login", "/"];
    
    // Only fetch user data if the current page is NOT a public route
    if (!publicRoutes.includes(location.pathname)) {
      fetchUser();
    }
  }, [location.pathname]); // Run this effect when the path changes

  return (
    <div className="min-h-screen pt-20 flex flex-col">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
