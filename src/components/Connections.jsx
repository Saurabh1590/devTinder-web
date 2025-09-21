import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-base-content/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h3.126a1 1 0 00.95-1.447l-1-2A1 1 0 0017.126 16H15v5z"
          />
        </svg>
        <h1 className="text-2xl font-bold mt-4">No Connections Yet</h1>
        <p className="text-base-content/70 mt-2">
          Start matching on the home feed to build your network!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, gender, age, about, photoUrl } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4 relative">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="">{about}</p>
            </div>
            <div>
              <Link to={"/chat/" + _id}>
            <button className="btn btn-primary">Chat</button>
            </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
