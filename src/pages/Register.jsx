import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../components/register/styles/register.css";

const Register = () => {
  const { handleSubmit, register, reset } = useForm();

  const submit = async (data) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users";
    try {
      const res = await axios.post(URL, data);
      console.log(res.data.data);
      localStorage.setItem("token", res.data.data.token);
      reset({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        role: ""
      });
      setTimeout(() => {
        localStorage.removeItem("token");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div className="register__container">
      <div className="register__header">
        <h2 className="register__text">
          Sign Up
        </h2>
      </div>
      <form className="register__form" onSubmit={handleSubmit(submit)}>
        <div className="form__icon--container">
          <i className="fas fa-user form__icon"></i>
        </div>


        <div className="form__container--name">
          <label className="form__label--name" htmlFor="name">
            Name
          </label>
          <input
            className="form__input--name"
            type="text"
            id="firstName"
            {...register("firstName")}
          />
        </div>
        <div className="form__container--surname">
          <label className="form__label--surname" htmlFor="surname">
            Last Name
          </label>
          <input
            className="form__input--surname"
            type="text"
            id="lastName"
            {...register("lastName")}
          />
        </div>
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
          <label className="form__label--passwordConfirmation" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="form__input--passwordConfirmation"
            type="text"
            id="phone"
            {...register("phone")}
          />
        </div>
        <div className="form__container--role">
          <label className="form__label--role" htmlFor="phone">
            Role
          </label>
          <input
            className="form__input--role"
            type="text"
            id="role"
            {...register("role")}
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
