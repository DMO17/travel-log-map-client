import { AiFillStar } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./style.css";
import { useAuth } from "../../context/AppProvider";
import { useState } from "react";

export const LoginForm = ({ setShowLoginForm }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { setIsLoggedIn, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    const { data } = await axios.post("/user/login", values);

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsLoggedIn(true);
      setLoading(false);
      setShowLoginForm(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <AiFillStar className="logoIcon" />
        <span>Travel Log Map</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoFocus
          placeholder="username"
          {...register("username", { required: true })}
        />
        <input
          type="password"
          min="6"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {(errors.username || errors.password) && (
          <span className="failure">
            Username and Password required to Login
          </span>
        )}
        <button className="loginBtn" type="submit">
          {!loading ? "Login" : "...Loading"}
        </button>
      </form>
      <span
        style={{ cursor: "pointer" }}
        className="failure"
        onClick={() => setShowLoginForm(false)}
      >
        <u>Cancel</u>
      </span>
    </div>
  );
};
