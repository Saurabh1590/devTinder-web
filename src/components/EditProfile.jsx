import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import * as Toast from "@radix-ui/react-toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState();
  const [openToast, setOpenToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          about,
          age: Number(age),
          gender: gender.toLowerCase(),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setOpenToast(true);
      setTimeout(() => {
        setOpenToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || err.message);
    }
  };

  return (
    <div>
      <div className="fixed top-[56px] bottom-[56px] left-0 right-0 bg-base-200 px-6 py-4 overflow-hidden z-10">
        <div className="h-full flex gap-4 max-w-7xl mx-auto">
          {/* UserCard */}
          <div className="w-[300px]">
            <UserCard
              user={{
                firstName,
                lastName,
                photoUrl,
                about,
                age,
                gender,
              }}
            />
          </div>

          {/* Edit Profile */}
          <div className="flex-1 bg-base-300 shadow-xl rounded-xl p-6 flex flex-col justify-between">
            <div className="overflow-hidden">
              <h2 className="text-2xl font-bold text-center text-white mb-4">
                Edit Profile
              </h2>

              <div className="grid gap-4 md:grid-cols-2 mb-4">
                <div>
                  <label className="label text-indigo-100">First Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label className="label text-indigo-100">Last Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="label text-indigo-100">Photo URL</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Enter your photo URL"
                  />
                </div>

                <div>
                  <label className="label text-indigo-100">Age</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="label text-indigo-100">Gender</label>
                  <select
                    className="select select-bordered w-full"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label text-indigo-100">Bio</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows="2"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Write something about yourself..."
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary px-6" onClick={saveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {openToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Your Profile has been saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
