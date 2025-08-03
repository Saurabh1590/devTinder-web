import { React, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile"); // Navigate to profile to complete details after signup
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">🧑‍💻 DevTinder</h1>
          <p className="text-base-content/70 mt-2">
            {isLoginForm ? "Welcome back! Please log in." : "Create an account to get started."}
          </p>
        </div>
        
        <div className="card bg-base-300 shadow-xl">
          <form className="card-body" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-bold text-center mb-4">
              {isLoginForm ? "Login" : "Sign Up"}
            </h2>

            {!isLoginForm && (
              <>
                <div className="form-control">
                  <label className="label"><span className="label-text">First Name</span></label>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Enter your first name"
                    className="input input-bordered"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-control mt-2">
                  <label className="label"><span className="label-text">Last Name</span></label>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Enter your last name"
                    className="input input-bordered"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="form-control mt-2">
              <label className="label"><span className="label-text">Email</span></label>
              <input
                type="email"
                value={emailId}
                placeholder="Enter your email"
                className="input input-bordered"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div className="form-control mt-2">
              <label className="label"><span className="label-text">Password</span></label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <p className="text-error min-h-[20px] text-sm mt-1">{error}</p>
            
            <div className="form-control mt-4">
              <button
                className="btn btn-primary w-full"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setIsLoginForm((value) => !value)}
                className="text-sm link link-hover"
              >
                {isLoginForm ? "New User? Sign up here" : "Existing User? Login here"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
