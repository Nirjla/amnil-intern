import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { useState } from "react";
import { loginValidationSchema, registerValidationSchema } from "../../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
export default function Login() {
      const { loginAction } = useAuth()
      const navigate = useNavigate()
      // const { loginAction } = useAuth()
      const [activeTab, setActiveTab] = useState("login"); // State to switch between Log In and Sign Up
      // const { register, handleSubmit, } = useForm()
      // Function to set active tab
      const handleTabClick = (tab: string) => {
            setActiveTab(tab);
      };

      const initialRegisterValues = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
      }
      const initialLoginValues = {
            email: "",
            password: ""
      }
      const handleRegisterSubmit = async (values: FormikValues, { setSubmitting, resetForm }: FormikHelpers<typeof initialRegisterValues>) => {
            try {
                  console.log("Hello")
                  console.log("Values", values)
                  const response = await axios.post(`api/auth/register`, values)
                  console.log("Res", response)
                  alert('User registered successfully');
                  resetForm();
            } catch (err) {
                  console.error('Registration error:', err);
                  alert('Error registering user');
            } finally {
                  setSubmitting(false)
            }

      }
      const handleLoginSubmit = async (values: FormikValues, { setSubmitting, resetForm }: FormikHelpers<typeof initialLoginValues>) => {
            try {
                  console.log("Values", values)
                  const response = await axios.post(`api/auth/login`, values);
                  loginAction(response.data.data)
                  alert('User login successfully');
                  console.log("Res", response)
                  resetForm()
                  navigate('/main-chat')
            } catch (err: any) {
                  console.log("error", err.response)
                  if (err.response && err.status === 400) {
                        alert(err.response.data.message)
                  }
                  else {
                        alert('Error logging user');
                  }
                  console.error('logging error:', err);
            } finally {
                  setSubmitting(false)
            }

      }


      return (
            <>

                  <section>
                        <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-10 md:py-20">
                              <div className="relative mx-auto max-w-xl bg-gray-100 px-8 py-12 text-center">


                                    {/* Buttons */}
                                    <div className="max-w-60 mx-auto flex justify-between mb-10">
                                          <button
                                                className={`text-xl font-bold md:text-2xl pb-4 px-2 cursor-pointer ${activeTab === "login" ? "border-b-2 border-black" : "text-gray-500"}`}
                                                onClick={() => handleTabClick("login")}
                                          >
                                                Log In
                                          </button>
                                          <button
                                                className={`text-xl font-bold md:text-2xl pb-4 px-2 cursor-pointer ${activeTab === "signup" ? "border-b-2 border-black" : "text-gray-500"}`}
                                                onClick={() => handleTabClick("signup")}
                                          >
                                                Sign Up
                                          </button>
                                    </div>
                                    <div className="mx-auto w-full max-w-md">
                                          {/* Form */}
                                          <div className="mx-auto mb-4 max-w-md pb-4">
                                                {activeTab === "login" &&
                                                      <Formik
                                                            initialValues={initialLoginValues}
                                                            validationSchema={loginValidationSchema}
                                                            onSubmit={handleLoginSubmit}>
                                                            {({ isSubmitting, dirty, isValid }) => {
                                                                  // const { errors, touched, isValid, dirty } = formik;
                                                                  return (
                                                                        <Form>
                                                                              <div className="relative flex flex-col">
                                                                                    <div className="font-bold mb-1 text-left">Email</div>
                                                                                    <Field
                                                                                          type="email"
                                                                                          name="email"
                                                                                          className="mb-6 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black"
                                                                                          placeholder="Email Address"
                                                                                    />
                                                                                    <ErrorMessage name="email" component="span" className="text-left text-sm text-red-400 " />
                                                                              </div>
                                                                              <div className="relative mb-4">
                                                                                    <div className="font-bold mb-1 text-left">Password</div>
                                                                                    <Field
                                                                                          type="password"
                                                                                          name="password"
                                                                                          className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black"
                                                                                          placeholder="Password (min 8 characters)"
                                                                                    />
                                                                                    <ErrorMessage name="password" component="span" className="text-left text-sm text-red-400 " />
                                                                              </div>

                                                                              <button
                                                                                    type="submit"
                                                                                    disabled={!(isValid && dirty)}
                                                                                    className={`inline-block w-full cursor-pointer items-center rounded-md  px-6 py-3 text-center font-semibold text-white
                                                                                          ${!(isValid && dirty) || isSubmitting ? "bg-gray-400" : "bg-indigo-600"}
                                                                                          `}
                                                                              >
                                                                                    Join WeChat
                                                                              </button>
                                                                        </Form>
                                                                  )
                                                            }}

                                                      </Formik>
                                                }
                                                {activeTab === "signup" &&
                                                      <Formik
                                                            initialValues={initialRegisterValues}
                                                            validationSchema={registerValidationSchema}
                                                            onSubmit={handleRegisterSubmit}>
                                                            {({ isValid, dirty, isSubmitting, errors }) => {
                                                                  console.log(errors)
                                                                  return (
                                                                        <Form>
                                                                              <div className="relative flex flex-col">
                                                                                    <div className="font-bold mb-1 text-left">Username</div>
                                                                                    <Field
                                                                                          type="text"
                                                                                          name="name"
                                                                                          className={
                                                                                                `mb-6 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black
                                                                                            `}
                                                                                          placeholder="Username"
                                                                                    />
                                                                                    <ErrorMessage name="name" component="span" className="text-left text-sm text-red-500 " />
                                                                              </div>
                                                                              <div className="relative flex flex-col">
                                                                                    <div className="font-bold mb-1 text-left">Email</div>
                                                                                    <Field
                                                                                          name="email"
                                                                                          type="email"
                                                                                          className={
                                                                                                ` mb-6 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black
                                                                                               `} placeholder="Email Address"
                                                                                    />
                                                                                    <ErrorMessage name="email" component="span" className="text-left text-sm text-red-400 " />
                                                                              </div>

                                                                              <div className="relative mb-4">
                                                                                    <div className="font-bold mb-1 text-left">Password</div>
                                                                                    <Field
                                                                                          name="password"
                                                                                          type="password"
                                                                                          className={
                                                                                                `mb-6 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black
                                                                                            `} placeholder="Password (min 8 characters)"
                                                                                    />
                                                                                    <ErrorMessage name="password" component="span" className="text-left text-sm text-red-400 " />
                                                                              </div>
                                                                              <div className="relative mb-4">
                                                                                    <div className="font-bold mb-1 text-left">Confirm Password</div>
                                                                                    <Field
                                                                                          name="confirmPassword"
                                                                                          type="password"
                                                                                          className={
                                                                                                `mb-6 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black placeholder:text-black
                                                                                               `} placeholder="Password (min 8 characters)"
                                                                                    />
                                                                                    <ErrorMessage name="confirmPassword" component="span" className="text-left text-sm text-red-400 " />
                                                                              </div>
                                                                              <button
                                                                                    type="submit"
                                                                                    disabled={!(dirty && isValid) || isSubmitting}
                                                                                    className={`
                                                                                          inline-block w-full cursor-pointer items-center rounded-md px-6 py-3 text-center font-semibold text-white
                                                                                     ${!(dirty && isValid) || isSubmitting ? "bg-gray-400" :
                                                                                                "bg-indigo-600 "}`}
                                                                              >
                                                                                    Join WeChat
                                                                              </button>
                                                                        </Form>)
                                                            }}

                                                      </Formik>
                                                }
                                          </div>

                                    </div>
                              </div>
                        </div>
                  </section>

            </>
      );
}