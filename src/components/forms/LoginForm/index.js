import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../../Schemas";
import FormField from "../FormField";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation } from "../../../features/api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/slices/authSlice";
import { PATHS } from "../../../Routes";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await login(values).unwrap();

        if (response.isSuccess) {
          dispatch(
            setAuth({
              user: response.data.user,
              token: response.data.token,
            })
          );
          console.log("Login successful", response.data);
          navigate(PATHS.HOME);
          resetForm();
        }
      } catch (error) {
        console.error("Login failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="login-form">
      <h1 className="welcoming-heading">Welcome To Edfa3 Banky</h1>

      <FormField
        label="Email Address"
        id="email"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
        placeholder="Enter Email Address"
      />
      <FormField
        label="Password"
        id="password"
        type="password"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
        placeholder="Enter Password"
      />
      <button type="submit" className="login-button" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <div>
        Dont Have An Account?{" "}
        <Link className="register-link" to={PATHS.SIGNUP}>
          Register
        </Link>
        {/* {error && <h4>{error}</h4>}
        {isError && (
          <h4>
            {error?.data?.message ||
              error?.error ||
              error?.statusText ||
              "An unexpected error occurred. Please try again."}
          </h4>
        )} */}
      </div>
    </form>
  );
};

export default LoginForm;
