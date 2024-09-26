import { useState } from "react"
import { useSignupMutation } from "../../api/authApi"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

export default function Signup() {
      const navigate = useNavigate()
      const [signup, { isLoading, error }] = useSignupMutation()

      if (error) {
            toast.error('Sorry! Something went wrong')
      }
      const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
      })
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value })

      }
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (formData.password !== formData.confirmPassword) {
                  toast.error('Passwords dont match')
                  return;
            }
            try {
                  await signup(formData);
                  toast.success('Registered successfully')
                  navigate('/signin')
                  setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                  })
            } catch (err) {
                  toast.error("Registration failed")
            }
      }

      return (<>
            <div className="container mx-auto px-4 py-6">
                  <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
                  <form className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
                        <div className="mb-4">
                              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                              <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>

                        <div className="mb-4">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                              <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>

                        <div className="mb-4">
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                              <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>

                        <div className="mb-4">
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                              <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                        </div>



                        <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                              {isLoading ?
                                    <Loader /> : 'Register'}
                        </button>

                  </form>
            </div></>)

}