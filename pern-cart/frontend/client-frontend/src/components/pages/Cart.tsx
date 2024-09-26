import { useSelector } from "react-redux";
import { useGetCartByUserIdQuery, useRemoveProductFromCartMutation, useUpdateCartQuantityMutation } from "../../api/cartApi";
import { RootState } from "../../store/store";
import Loader from "../common/Loader";
import MainLayout from "../../layout/MainLayout";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {

      const userFromLocalStorage = localStorage.getItem('user');
      const userFromState = useSelector((state: RootState) => state.auth.user);
      const userId = typeof userFromState === 'string'
            ? userFromState
            : (typeof userFromLocalStorage === 'string' ? userFromLocalStorage : null);

      if (userId === null) {
            return toast.error('Please Login first');

      }

      const { data, isLoading: isCartLoading, refetch } = useGetCartByUserIdQuery(userId);
      console.log("Cart", data)
      const [updateCartQuantity, { error: isUpdateError }] = useUpdateCartQuantityMutation()
      const [removeProductFromCart, { isLoading: isRemoving, error: isRemoveError }] = useRemoveProductFromCartMutation()


      if (isCartLoading || isRemoving) {
            return <Loader />;
      }

      if (isUpdateError || isRemoveError) {
            return toast.error("Sorry Something went wrong.");
      }
      const handleUpdateCartQuantity = async (productId: string, quantity: number) => {
            try {
                  await updateCartQuantity({ userId, productId, quantity })
                  await refetch()

            } catch (err) {
                  return toast.error("Failed to increased ");

            }
      }
      const handleRemoveCart = async (productId: string) => {
            try {
                  await removeProductFromCart({ userId, productId })
                  await refetch()
                  toast.success("Removed  successfully");

            } catch (err) {
                  return toast.error("Failed to remove ");

            }
      }
      const totalAmount = data?.cartProducts.reduce((total, cp) => total + (cp.product.price * cp.quantity), 0)
      return (
            <MainLayout>
                  <div className="py-5">
                        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Your Cart</h1>
                        {!data?.cartProducts.length || data?.isCheckout
                              ? (
                                    <p>Your cart is empty</p>
                              ) : (
                                    data?.cartProducts.map((product) => (
                                          <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                                                <div className="p-4 flex items-center">
                                                      <img src={product.product.imageUrl} alt="Product" className="w-24 h-24 object-cover" />
                                                      <div className="ml-4 flex-1">
                                                            <h2 className="text-xl font-semibold text-gray-800">{product.product.name}</h2>
                                                            <p className="text-gray-600 mt-1">Rs {product.product.price}</p>
                                                            <div className="flex items-center mt-2 space-x-4">
                                                                  <button
                                                                        onClick={() => handleUpdateCartQuantity(product.product.id, product.quantity - 1)}
                                                                        disabled={product.quantity <= 1}
                                                                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
                                                                  >
                                                                        -
                                                                  </button>
                                                                  <span className="text-gray-800">{product.quantity}</span>
                                                                  <button
                                                                        onClick={() => handleUpdateCartQuantity(product.product.id, product.quantity + 1)}

                                                                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
                                                                  >
                                                                        +
                                                                  </button>
                                                                  <button
                                                                        onClick={() => handleRemoveCart(product.product.id)}
                                                                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                                                  >
                                                                        Remove
                                                                  </button>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    ))
                              )}
                        {(data?.cartProducts?.length || 0) > 0 && !data?.isCheckout && (
                              <div className="mt-6 text-center">
                                    <p className="text-xl font-semibold text-gray-800 mb-3">Total Amount: Rs {totalAmount}</p>
                                    <Link to={'/checkout'}
                                          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                          Checkout
                                    </Link>
                              </div>
                        )}

                  </div>
            </MainLayout>
      );
}
