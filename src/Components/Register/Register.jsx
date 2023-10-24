import React from "react";
import style from "../Login/Loign.module.css";
import { useQuery } from "react-query";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  let nav = useNavigate();
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "minium is 3")
      .max(10, "Max is 10")
      .required("Name is Required"),
    email: Yup.string()
      .matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Email format doesnt valid")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Phone format is not valid"
      )
      .required("Phone is required"),
    age: Yup.number().required("Age is required"),

    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,20}/, "Password is not valid"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      password: "",
    },
    onSubmit: sendData,
    validationSchema,
  });
  async function sendData(values) {
    console.log(values);
    let { data } = await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", {
        name: `${values.name}`,
        email: `${values.email}`,
        password: `${values.password}`,
        age: values.age,
        phone: `${values.phone}`,
      })
      .catch((err) => err);
    console.log(data.msg);
    if (data?.msg == "done") {
      nav("/login");
    } else {
      toast("Register Failed your email or Name is used ❌⚠️⚠️");
    }
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Toaster />
      <div className="w-100 min-vh-100  d-flex justify-content-center">
        <div id="login-div" className={`${style.mlogin} `}>
          <div className={`${style.loginheader}`}>
            <h2 className="animate__animated animate__bounceInDown">
              Register
            </h2>
          </div>
          <div>
            <div className="login-body ">
              <div className="position-relative">
                <input
                  id="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  name="name"
                  type="text"
                  placeholder="Username"
                  className="input animate__animated animate__bounceInLeft"
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alerted">
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="position-relative">
                <input
                  type="email"
                  id="userEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                  placeholder="Email"
                  className="input animate__animated animate__bounceInRight"
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="alerted">
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="position-relative">
                <input
                  type="tel"
                  id="userPhone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  name="phone"
                  placeholder="Phone"
                  className="input animate__animated animate__bounceInLeft"
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alerted">
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="position-relative">
                <input
                  type="number"
                  id="userAge"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                  name="age"
                  placeholder="Age"
                  className="input animate__animated animate__bounceInRight"
                />
                {formik.errors.age && formik.touched.age ? (
                  <div className="alerted">
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="position-relative">
                <input
                  type="password"
                  id="userPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  name="password"
                  placeholder="password"
                  className="input animate__animated animate__bounceInLeft"
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="alerted">
                    <i class="fa-solid fa-circle-exclamation"></i>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                className="form-btn animate__animated animate__bounceInUp"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
