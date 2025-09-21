import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (!connections || connections.length === 0) {
      fetchConnections();
    }
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-screen pt-24 pb-20 px-4">
        <img
        src="/assets/no-connections.png"
        alt="No connections yet illustration"
        className="w-64"
      />
        <h1 className="text-2xl font-bold mt-4">No Connections Yet</h1>
        <p className="text-base-content/70 mt-2">
          Start matching on the home feed to build your network!
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Connections</h1>
        <div className="space-y-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, gender, age, about, photoUrl } =
              connection;

            return (
              <div
                key={_id}
                className="flex items-center p-4 border border-white/10 rounded-lg bg-base-300 w-full lg:w-3/4 mx-auto shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div>
                  <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                  />
                </div>
                <div className="text-left mx-4 flex-grow">
                  <h2 className="font-bold text-xl">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-base-content/70">
                      {age}, {gender}
                    </p>
                  )}
                  <p className="text-base-content/90 mt-1 line-clamp-2">
                    {about}
                  </p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <Link to={"/chat/" + _id}>
                    <button className="btn btn-primary btn-sm md:btn-md">Chat</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;