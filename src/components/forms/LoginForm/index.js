import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../../Schemas";
import FormField from "../FormField";
import "./style.css";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      resetForm({
        email: "",
        password: "",
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="login-form">
      <h1>Welcome To Edfa3 Banky</h1>

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
      <button type="submit" className="login-button">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
