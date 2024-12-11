import * as yup from "yup";

// const passwordRules = "^(?=.*[a-z])(?=.*[A-Z]).{6,}$";
const phoneRegex = /^(059|056)\d{7}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("You should have an email"),
  password: yup.string().min(2).required("You should have a password"),
});

export const SignupSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim() // Remove leading and trailing spaces
    .transform((value) => value.replace(/\s+/g, " "))
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .required("Name is required"),
  email: yup.string().email().required("You should have an email"),
  phoneNumber: yup
    .string()
    .matches(
      phoneRegex,
      "Phone number should start with 059 or 056 and then 7 digits."
    )
    .required("Phone number is required"),
  password: yup.string().min(2).required("You should have a password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match") // Ensure the confirmPassword matches the password
    .required("Confirm password is required"),
});

export const productSchema = yup.object().shape({
  name: yup.string().required("Product name is required."),
  description: yup.string().required("Description is required."),
  subcategoryId: yup.number().required("Subcategory ID is required."),
  price: yup
    .number()
    .min(0, "Price must be greater than 0")
    .required("Price is required."),
  discount: yup
    .number()
    .min(0, "Discount must be at least 0")
    .required("Discount is required."),
  image: yup.mixed().required("Main image is required."), // Main image validation
});
