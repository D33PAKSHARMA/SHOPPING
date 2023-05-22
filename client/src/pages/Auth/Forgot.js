import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [answer, setAnswer] = useState("");

  const Navigate = useNavigate();

  // console.log(email, password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post Request for Login on Backend
      const res = await axios.post("/forgot-password", {
        email,
        newpassword,
        answer,
      });
      if (res.data.success) {
        toast.success(res.data.message);

        Navigate("/login");
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
        <h2>Forgot Password</h2>
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
              value={newpassword}
              onChange={(e) => {
                setNewpassword(e.target.value);
              }}
              placeholder="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="mb-3">
            <input
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              placeholder="Your fav Sport"
              type="text"
              className="form-control"
              id="exampleInputPassword2"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary item-center">
            Forgot password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgot;
