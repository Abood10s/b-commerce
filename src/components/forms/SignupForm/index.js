import { useFormik } from "formik";
import React, { useState } from "react";
import { SignupSchema } from "../../../Schemas";
import FormField from "../FormField";
import "../LoginForm";
import { useRegisterMutation } from "../../../features/api/authApi";

import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes";
import "../LoginForm/style.css";
import Spinner from "../../Spinner";
import Banky from "../../../assets/banky.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        const response = await register(dataToSubmit).unwrap();

        if (response.isSuccess) {
          toast.success("تم تسجيلك بنجاح", {
            theme: "colored",
            position: "top-center",
          });
          setTimeout(() => {
            navigate(PATHS.LOGIN);
          }, 1500);
          resetForm();
        } else {
          console.error("Signup failed: ", response.message);
        }
      } catch (error) {
        console.error("Signup failed", error);
        toast.error("حدث خطأ أثناء تسجيلك حاول لاحقا.");
      }
    },
  });

  return (
    <div className="login-page-container">
      <div className="form-cont">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <h1 className="welcoming-heading">تسجيل مستخدم جديد</h1>
          <ToastContainer />

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
            type={showPassword ? "text" : "password"}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            placeholder="Enter Password"
            icon={
              showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiFillEye onClick={() => setShowPassword(!showPassword)} />
              )
            }
          />
          <FormField
            label="Confirm Your Password"
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            placeholder="Confirm your password"
            icon={
              showConfirmPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )
            }
          />
          {isError && (
            <p className="error-text">
              {error.data.ExtendedMessage ||
                "An error occurred. Please try again."}
            </p>
          )}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <Spinner /> : "تسجيل"}
          </button>

          <div>
            لديك حساب؟{" "}
            <Link className="register-link" to={PATHS.LOGIN}>
              تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
      <div className="login-image">
        <h3>
          أهلا في<p className="color-text"> ادفع بنكي</p>
        </h3>
        <img src={Banky} alt="banky app" />
      </div>
    </div>
  );
};

export default SignupForm;
