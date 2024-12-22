import React, { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../../Schemas";
import FormField from "../FormField";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../features/api/authApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../features/slices/authSlice";
import { PATHS } from "../../../Routes";
import Spinner from "../../Spinner";
import Banky from "../../../assets/banky.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
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

          navigate(PATHS.HOME);
          resetForm();
        }
      } catch (error) {
        console.error("Login failed");
      }
    },
  });

  return (
    <div className="login-page-container">
      <div className="form-cont">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <h1 className="welcoming-heading">تسجيل الدخول</h1>
          <div className="form-header">
            <div
              className="logo"
              style={{ maxWidth: "50px", marginBottom: "2rem" }}
            ></div>
          </div>

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
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <Spinner /> : "تسجيل الدخول"}
          </button>
          <div>
            ليس لديك حساب؟
            <Link className="register-link" to={PATHS.SIGNUP}>
              تسجيل
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

export default LoginForm;
