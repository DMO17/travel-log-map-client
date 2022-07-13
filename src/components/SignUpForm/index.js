import { AiFillStar } from "react-icons/ai";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./style.css";
import { useState } from "react";

export const SignUpForm = ({ setShowSignupForm }) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const onSubmit = async ({ password, confirmPassword, email, username }) => {
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      setLoading(true);
      const { data } = await axios.post("/user/sign-up", {
        password,
        email,
        username,
      });

      if (!data.success) {
        setSignupError(true);
      } else {
        setShowSignupForm(false);
      }
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

        <input placeholder="email" {...register("email", { required: true })} />

        <input
          type="password"
          min="6"
          placeholder="password"
          {...register("password", { required: true })}
        />

        <input
          type="password"
          min="6"
          placeholder="confirmPassword"
          {...register("confirmPassword", { required: true })}
        />
        {(errors.username ||
          errors.password ||
          errors.confirmPassword ||
          errors.email) && (
          <span className="failure">All the are required to Signup</span>
        )}
        <button className="loginBtn" type="submit">
          {!loading ? "Sign up" : "...Loading"}
        </button>
      </form>
      <span
        style={{ cursor: "pointer" }}
        className="failure"
        onClick={() => setShowSignupForm(false)}
      >
        <u>Cancel</u>
      </span>

      {signupError && (
        <span className="failure">
          Sorry Something went wrong, try again !!
        </span>
      )}
    </div>
  );
};
