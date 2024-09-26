import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../api/authApi";
import { setCredentials } from "../../slices/authSlice";
import toast from "react-hot-toast";

export default function Signin() {
      const [signin, { isLoading, error }] = useSigninMutation();
      console.log('isloading', isLoading)
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const [formData, setFormData] = useState({
            email: '',
            password: ''
      })
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value })

      }
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            try {
                  console.log("FormData", formData)
                  const result = await signin(formData);
                  setFormData({
                        email: '',
                        password: ''
                  })
                  navigate('/')
                  dispatch(setCredentials({ token: result.data.token, user: result.data.user }))
                  toast.success(result.data.message)
            } catch {
                  toast.error("Signin failed")
            }
      }
      if (error) {
            return toast.error('Sorry!Something went wrong..')
      }
      return (<>
            <div className="container mx-auto px-4 py-6">
                  <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Login</h1>
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                              <label htmlFor="email" className="block text-gray-700">Email</label>
                              <input
                                    id="email"
                                    name='email'
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                        </div>
                        <div className="mb-4">
                              <label htmlFor="password" className="block text-gray-700">Password</label>
                              <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                        </div>
                        <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                              {isLoading ? 'Logging in...' : 'Login'}
                        </button>

                  </form>
            </div>
      </>)
}