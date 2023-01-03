import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../components/home/styles/register.css";

const Register = () => {
  const { handleSubmit, register, reset } = useForm();

  const submit = (data) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users";
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((err) => console.log(err));
    reset({
      email: "",
      password: "",
      name: "",
      surname: "",
      passwordConfirmation: "",
    });
  };

  return (
    <div className="register__container">
      <div className="register__header">
        <h2 className="register__text">
          Sign Up
        </h2>
      </div>
      <form className="register__form" onSubmit={handleSubmit(submit)}>
        <h1 className="register__icon">
          <i className="fa-regular fa-user"></i>
        </h1>
        <div className="form__container--email">
          <label className="form__label--email" htmlFor="email">
            Email
          </label>
          <input
            className="form__input--email"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>
        
        <div className="form__container--name">
          <label className="form__label--name" htmlFor="name">
            Name
          </label>
          <input
            className="form__input--name"
            type="text"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="form__container--surname">
          <label className="form__label--surname" htmlFor="surname">
            Last Name
          </label>
          <input
            className="form__input--surname"
            type="text"
            id="surname"
            {...register("surname")}
          />
        </div>
        <div className="form__container--pass">
          <label className="form__label--pass" htmlFor="password">
            Password
          </label>
          <input
            className="form__input--pass"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <div className="form__container--passwordConfirmation">
          <label className="form__label--passwordConfirmation" htmlFor="passwordConfirmation">
          Confirm Password
          </label>
          <input
            className="form__input--passwordConfirmation"
            type="password"
            id="passwordConfirmation"
            {...register("passwordConfirmation")}
          />
        </div>
        <button className="form__signUp--btn">Sign Up</button>
        <div className="form__logout--container">
          <p className="form__logout--text">Already have an account?</p>
          <Link className="form__logout--link" to={'/login'}>login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

          