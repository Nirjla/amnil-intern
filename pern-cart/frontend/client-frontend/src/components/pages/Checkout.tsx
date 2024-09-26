import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useCreateCheckoutMutation } from "../../api/checkoutApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

export default function Checkout() {
      const userFromLocalStorage = localStorage.getItem('user');
      const userFromState = useSelector((state: RootState) => state.auth.user);
      const userId = typeof userFromState === 'string'
            ? userFromState
            : (typeof userFromLocalStorage === 'string' ? userFromLocalStorage : null);

      const [createCheckout, { isLoading }] = useCreateCheckoutMutation()
      const [formData, setFormData] = useState({
            shippingAddress: '',
            paymentMethod: 'COD'
      })
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value })

      }
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (!userId) {
                  toast.error('Please log in first');
                  return;
            }
            try {
                  await createCheckout({ userId, ...formData }).unwrap()
                  setFormData({ shippingAddress: '', paymentMethod: 'COD' })
                  toast.success('Checkout successful!');
            } catch (err) {
                  console.error(err)
                  toast.error('Checkout failed, please try again.');
            }

      }
      return (<>
            <MainLayout>
                  <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Checkout</h1>
                  <div className="mt-6 ">
                        <form onSubmit={handleSubmit}>
                              <div className=" grid grid-cols-2">
                                    <div className="space-y-4">
                                          <label className="block text-gray-700">Your Shipping Address</label>
                                          <input
                                                type="text"
                                                name="shippingAddress"
                                                value={formData.shippingAddress}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 p-2 rounded-md"
                                                required
                                          />
                                          <label className="block text-gray-700">Payment Method</label>
                                          <div key={''} className="flex items-center me-4 p-1">
                                                <input
                                                      id={''}
                                                      type="checkbox"
                                                      value={formData.paymentMethod}
                                                      onChange={handleChange}
                                                      checked
                                                      name="paymentMethod"
                                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label htmlFor={''} className="ms-2 text-sm font-medium text-gray-700">COD</label>
                                          </div>

                                          <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                          >
                                                {isLoading ?
                                                      <Loader /> : 'Checkout'}
                                          </button>

                                    </div>
                              </div>
                        </form>
                  </div>
            </MainLayout>
      </>)
}