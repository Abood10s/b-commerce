import * as yup from "yup";

// const passwordRules = "^(?=.*[a-z])(?=.*[A-Z]).{6,}$";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("You should have an email"),
  password: yup.string().min(2).required("You should have a password"),
});
