import React from "react";
import { useState } from "react";
import supabase from "../config/Client";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setToken }) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.warn("Please fill in all the fields correctly", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error("You don't have an account with us, please Sign Up", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        throw new Error("You dont");
      }
      if (data) {
        toast.success("Check your email to get verified", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setToken(data);
        navigate("/notepad");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="page create">
        <form onSubmit={handleSubmit}>
          <h3 className="h3">NOTIFY Login</h3>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={handleChange} />
          <button type="submit" className="sub">
            Login
          </button>
        </form>
        <p>
          Don't have an account?
          <Link
            to={"/signup"}
            style={{ color: "#12bca2", textDecoration: "none" }}
          >
            Sign Up
          </Link>{" "}
        </p>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default Login;
