import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  const Navigate = useNavigate();

  // console.log(name, email, password, phone);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/register", {
        name,
        email,
        password,
        phone,
        answer,
      });
      if (res.data.sucess) {
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
        <h2>Register Now</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp1"
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
              className="form-control"
              id="exampleInputEmail"
              required
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
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
          <div className="mb-3">
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="text"
              placeholder="phone"
              className="form-control"
              id="exampleInputAnswer1"
              required
            />
          </div>
          <div className="mb-3">
            <input
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              type="text"
              placeholder="Your Fav Game"
              className="form-control"
              id="exampleInputAnswer"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary item-center">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
