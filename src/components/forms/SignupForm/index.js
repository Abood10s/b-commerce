import { useFormik } from "formik";
import React from "react";
import { SignupSchema } from "../../../Schemas";
import FormField from "../FormField";
import "../LoginForm";
import { useRegisterMutation } from "../../../features/api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes";

const SignupForm = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      const { confirmPassword, ...dataToSubmit } = values;

      try {
        const response = await register(dataToSubmit).unwrap(); // Get the resolved data directly

        if (response.isSuccess) {
          const { user, token } = response.data; // Destructure directly if the structure is flat
          dispatch(
            setAuth({
              user,
              token,
            })
          );
          console.log("Signup successful", response.data);
          navigate(PATHS.HOME); // Redirect to home after successful signup
          resetForm();
        } else {
          console.error("Signup failed: ", response.message);
          // Optionally, display an error message to the user
          alert(response.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Signup failed", error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="login-form">
      <h1 className="welcoming-heading">Welcome To Edfa3 Banky</h1>
      <FormField
        label="Full Name"
        id="fullName"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.fullName}
        error={formik.touched.fullName && formik.errors.fullName}
        placeholder="Enter Full Name"
      />
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
        label="Phone Number"
        id="phoneNumber"
        name="phoneNumber"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.phoneNumber}
        error={formik.touched.phoneNumber && formik.errors.phoneNumber}
        placeholder="Enter Phone Number"
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
      <FormField
        label="Confirm Your Password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
        placeholder="Confirm your password"
      />
      <button type="submit" className="login-button" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      <h4>
        Already Have An Account?
        <Link className="register-link" to={PATHS.LOGIN}>
          Login
        </Link>
      </h4>
    </form>
  );
};

export default SignupForm;
