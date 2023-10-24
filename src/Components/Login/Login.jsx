import React, { useContext } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import style from "./Loign.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../Contexts/UserToken";
import toast, { Toaster } from "react-hot-toast";
import { Toast } from "bootstrap";

export default function Login() {
  let nav = useNavigate();
  let { userToken, setUserToken } = useContext(UserContext);

  async function sendData(values) {
    let { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .catch((err) => err);
    if (data?.msg == "done") {
      setUserToken(`3b8ny__${data.token}`);
      localStorage.setItem("userToken", `3b8ny__${data.token}`);
      nav("/");
    } else {
      toast("Login failed ⚠️❌  \n your mail or password is unvalid");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendData,
  });
  return (
    <>
      <Toaster />
      <form onSubmit={formik.handleSubmit}>
        <div className="w-100 min-vh-100 d-flex justify-content-center">
          <div id="login-div" className={`${style.mlogin} `}>
            <div className={`${style.loginheader}`}>
              <h2 className="animate__animated animate__bounceInDown">
                Sign In
              </h2>
            </div>
            <div className="login-body ">
              <div></div>
              <input
                id="userEmail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                type="text"
                placeholder="Username"
                className="input animate__animated animate__bounceInLeft"
              />

              <input
                id="userPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                type="password"
                placeholder="password"
                className="input animate__animated animate__bounceInRight"
              />
              <button
                type="submit"
                className="form-btn animate__animated animate__bounceInUp "
              >
                SIGN IN
              </button>
              <div className="login-footer d-block m-5 animate__animated animate__fadeIn">
                <div className="text-center">
                  <h4 className="fs-6">Don't have an account ?</h4>
                  <h6
                    className="m-color cursor"
                    onClick={() => {
                      nav("/register");
                    }}
                  >
                    SIGN UP NOW
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
