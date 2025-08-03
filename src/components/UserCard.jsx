import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { removeUserFromFeed } from "../utils/feedSlice";

// An icon for interest (you can use an SVG library like heroicons)
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    />
  </svg>
);

// An icon for ignoring
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      // Handle error gracefully
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-xl transition-transform duration-300 hover:scale-105">
      <figure className="h-80 overflow-hidden">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-2xl">
          {firstName} {lastName}
          {age && <span className="text-lg font-normal ml-2">{age}</span>}
        </h2>
        <p className="text-sm text-base-content/70 h-12 line-clamp-2">
          {about}
        </p>

        {/* SKILLS SECTION - This is new and important! */}
        <div className="my-2 flex flex-wrap gap-2">
          {(skills || []).map((skill) => (
            <div key={skill} className="badge badge-primary badge-outline">
              {skill}
            </div>
          ))}
        </div>

        <div className="card-actions justify-around mt-4">
          <button
            className="btn btn-circle btn-lg"
            aria-label="Ignore"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <XIcon />
          </button>
          <button
            className="btn btn-primary btn-circle btn-lg"
            aria-label="Interested"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <HeartIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
