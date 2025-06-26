import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      // error
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

   if (!requests) return;

  if (requests.length === 0) return <h1>No Request Found.</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, gender, age, about, photoUrl } =
          request?.fromUserId;

        return (
          <div className="flex m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img src={photoUrl} alt="photo" className="w-20 h-20 rounded-full" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="">{about}</p>
            </div>
            <div className="ml-auto flex flex-row items-center gap-2">
              <button class="btn btn-dash btn-secondary">Accept</button>
              <button class="btn btn-outline btn-primary">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
