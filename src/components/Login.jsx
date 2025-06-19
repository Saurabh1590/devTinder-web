import { React, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("jisoo@gmail.com");
  const [password, setPassword] = useState("Jisoo@1234");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.request?.response || "something went wrong");
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 px-4">
      <div className="card w-full max-w-sm bg-base-300 shadow-xl">
        <form className="card-body" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={emailId}
              placeholder="Enter your email"
              className="input input-bordered"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div className="form-control mt-4 my-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              className="input input-bordered"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <div className="form-control mt-6 flex justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
