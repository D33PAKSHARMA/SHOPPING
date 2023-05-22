import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  const [auth, setAuth] = useAuth();

  // console.log(email, password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post Request for Login on Backend
      const res = await axios.post("/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        // After login we store user data dnd Token on LocalStorage
        localStorage.setItem("auth", JSON.stringify(res.data));
        Navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="register">
        <h2>Login Now</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              className="form-control"
              id="exampleInputEmail1"
              required
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <button
            type="button"
            className="btn btn-primary item-center w-100 mb-2"
            onClick={() => {
              Navigate("/forgot");
            }}
          >
            Forgot Password
          </button>

          <button type="submit" className="btn btn-primary item-center">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
