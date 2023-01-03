import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../components/home/styles/login.css";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();

  const [token, setToken] = useState();
  const [user, setUser] = useState({});
    

  const submit = (data) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users/login";
    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data.data);
        localStorage.setItem("token", res.data.data.token);
        setToken(res.data.data.token);
        setUser(res.data.data.user);
      })
      .catch((err) => console.log(err));
    reset({
      email: "",
      password: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, []);


  return (
    <>
      <div className="login__container">
        {!token && (
          <>
            <div className="login__header">
              <h2 className="login__text">
                Welcome! Enter your email and password to continue
              </h2>
            </div>
            <form className="login__form" onSubmit={handleSubmit(submit)}>
              <h1 className="login__icon">
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
              <button className="form__login--btn">Login</button>
              <div className="form__logout--container">
                <p className="form__logout--text">Don't have an account?</p>
                <Link className="form__logout--link" to={"/register"}>
                  Sign Up
                </Link>
              </div>
            </form>
          </>
        )}
        {token && (
          // Mostrar nombre del usuario aquí
          <div className="loginUser__container">
            <div className="loginUser__icon">
                <i className="fa-regular fa-user"></i>
            </div>
            <h1 className="loginUser__title">¡Welcome!</h1>
            <h3 className="loginUser__info">{` ${user.firstName} ${user.lastName}`}</h3>
            <button className="loginUser__btn" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
