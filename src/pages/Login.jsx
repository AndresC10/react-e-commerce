import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Error from "../components/login/Error";
import "../components/login/styles/login.css";
import { getUserCart, setCart } from "../store/slices/cart.slice";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();

  const dispatch = useDispatch()

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [error, setError] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const submit = (data) => {
    const URL = "https://e-commerce-api.academlo.tech/api/v1/users/login";
    axios
      .post(URL, data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        setToken(res.data.data.token);
        setUser(res.data.data.user);
        dispatch(getUserCart())
        dispatch(setCart(res.data.data.user.cart))
      })
      .catch((err) => {
        console.log(err)
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
    reset({
      email: "",
      password: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    dispatch(setCart(null))
  };




  return (
    <>
      <div className="login__container">
        {!token && (
          <>
            <div className="login__header">
              {!error ? <h2 className="login__text">
                Welcome! Enter your email and password to continue
              </h2> : <Error
                children="Incorrect email or password, enter a valid User"
              />
              }
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

          <div className="loginUser__container">
            <div className="loginUser__icon">
              <i className="fa-regular fa-user"></i>
            </div>
            <h1 className="loginUser__title">??Welcome!</h1>
            <h3 className="loginUser__info">{` ${user?.firstName} ${user?.lastName}`}</h3>
            <button className="loginUser__btn" onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
