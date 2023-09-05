import { useState } from "react";
import supabase from "../config/Client";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
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
    if (!formData.fullname || !formData.email || !formData.password) {
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullname,
          },
        },
      });

      if (error) {
        toast.error("Failed to Sign Up, try again", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      }
      setFormData({ fullname: "", email: "", password: "" });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="page create">
        <form onSubmit={handleSubmit}>
          <h3 className="h3">NOTIFY SignUp</h3>
          <label htmlFor="fullname">FullName:</label>
          <input
            value={formData.fullname}
            type="text"
            name="fullname"
            onChange={handleChange}
          />
          <label htmlFor="email">Email:</label>
          <input
            value={formData.email}
            type="email"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            value={formData.password}
            type="password"
            name="password"
            onChange={handleChange}
          />

          <button type="submit" className="sub">
            Submit
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            style={{ color: "#12bca2", textDecoration: "none" }}
          >
            Login
          </Link>
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

export default SignUp;
