import * as Yup from "yup"
export const registerValidationSchema = Yup.object().shape({
      name: Yup.string().min(2, "Username must be atleast 2 characters").required("Username must required"),
      email: Yup.string().email("Invalid email address").required("Must required"),
      password: Yup.string().min(8, "Password must be 8 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password must match").required("Must required")

})

export const loginValidationSchema = Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Must required"),
      password: Yup.string().min(8, "Password must be 8 characters").required("Password is required"),

})