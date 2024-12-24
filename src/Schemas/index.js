import * as yup from "yup";

// const passwordRules = "^(?=.*[a-z])(?=.*[A-Z]).{6,}$";
const phoneRegex = /^(059|056)\d{7}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("يجب أن تدخل بريدك الالكتروني"),
  password: yup.string().min(6).required("يجب إدخال كلمة المرور"),
});

export const SignupSchema = yup.object().shape({
  fullName: yup
    .string()
    .trim()
    .transform((value) => value.replace(/\s+/g, " "))
    .min(2, "يجب أن يتكون الاسم على الاقل من حرفين")
    .max(50, "لا يجب أن يتجاوز الاسم 50 حرفا")
    .matches(/^[a-zA-Z\s]+$/, "الاسم يحتوي على أحرف ومسافات فقط")
    .required("الاسم مطلوب"),
  email: yup.string().email().required("يجب أن يكون لديك بريد الكتروني"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "يجب أن يبدأ رقم الهاتف بـ 059 أو 056 ثم 7 أرقام.")
    .required("رقم الهاتف المحمول لا يمكن أن يترك فارغا"),
  password: yup
    .string()
    .min(6, "يجب أن يكون طول كلمة المرور على الأقل 6")
    .required("يجب أن يكون لديك كلمة مرور"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "يجب أن تتطابق كلمات المرور")
    .required("يجب أن تدخل كلمة المرور المطابقة"),
});

export const productSchema = yup.object().shape({
  name: yup.string().required("اسم المنتج مطلوب."),
  description: yup.string().required("وصف المنتج كطلوب."),
  subcategoryId: yup.number().required("يجب إختيار فئة فرعية."),
  price: yup
    .number()
    .min(0, "السعر يجب أن يكون أكبر من 0")
    .required("السعر لا يجب أن يكون فارغا."),
  discount: yup.number().min(0, "الخصم على الأقل صفر").required("الخصم مطلوب."),
  image: yup.mixed().required("الصورة الرئيسية مطلوبة."),
  quantity: yup.number().min(0, "أقل كمية 0").required("الكمية مطلوبة."),
});
