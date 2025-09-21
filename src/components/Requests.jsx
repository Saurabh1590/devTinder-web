import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequests } from "../utils/requestSlice";

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
      console.error("something went wrong: ", err);
    }
  };

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
    } catch (err) {
      console.error("something went wrong: ", err);
    }
  };

  useEffect(() => {
    // Only fetch if requests are not already in the store
    if (!requests) {
      fetchRequests();
    }
  }, [requests, dispatch]);

  // Loading state while requests are being fetched for the first time
  if (!requests) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-screen my-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-base-content/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h1 className="text-2xl font-bold mt-4">No New Requests</h1>
        <p className="text-base-content/70 mt-2">
          You're all caught up! Check back later for new connection requests.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Connection Requests
        </h1>
        <div className="space-y-4">
          {requests.map((request) => {
            const { _id, firstName, lastName, gender, age, about, photoUrl } =
              request?.fromUserId || {};

            // If for some reason a request has no sender, skip rendering it.
            if (!_id) return null;

            return (
              <div
                key={request._id}
                className="flex flex-col sm:flex-row items-center p-4 border border-white/10 rounded-lg bg-base-300 w-full lg:w-3/4 mx-auto shadow-lg"
              >
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  <img
                    src={photoUrl}
                    alt={firstName}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left mx-4 flex-grow">
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
                <div className="ml-auto flex flex-row items-center gap-2 mt-4 sm:mt-0 flex-shrink-0">
                  <button
                    className="btn btn-primary btn-sm md:btn-md"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-outline btn-secondary btn-sm md:btn-md"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
