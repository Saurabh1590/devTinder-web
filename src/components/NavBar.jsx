import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import {BASE_URL} from "../utils/constant";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    return navigate("/");
  } catch (err) {
    console.error("Logout error:", err);
  }
};

  return (
    <div className="navbar bg-base-300/80 backdrop-blur-sm shadow-sm fixed top-0 z-50 border-b border-white/10">
      <div className="flex-1">
        <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">
          🧑‍💻 DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-4 items-center mx-3">
          <div className="hidden md:flex items-center">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" className="justify-between">
                  Get Premium 🔥
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
