import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../api/productApi";
import CardWrapper from "../wrapper/CardWrapper";
import Loader from "./Loader";
import { Product } from "../../interfaces/interfaces";
import SecondaryButton from "./SecondaryButton";
import { useAddToCartMutation, useGetCartByUserIdQuery } from "../../api/cartApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import toast from "react-hot-toast";

export default function ProductCard() {
    const { data, isLoading, error } = useGetProductsQuery();
    const [addToCart] = useAddToCartMutation();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const userFromState = useSelector((state: RootState) => state.auth.user);
    const userFromLocalStorage = localStorage.getItem('user');
    const userId = typeof userFromState === 'string' ? userFromState : (typeof userFromLocalStorage === 'string' ? userFromLocalStorage : null);

    const { refetch: refetchCart } = useGetCartByUserIdQuery(userId as string)

    if (isLoading) return <Loader />;
    if (error) return <p>Error fetching products</p>;

    const products: Product[] = data?.product || [];

    const handleAddToCart = async (product: Product) => {
        if (isAuthenticated && userId) {
            try {
                await addToCart({ userId, productId: product.id, quantity: 1 }).unwrap();
                await refetchCart(); // Refetch the cart to update the cart number
                toast.success(`${product.name} added successfully`);
            } catch (err) {
                console.error('Failed to add to cart:', err);
                toast.error('Failed to add item to cart.');
            }
        } else {
            toast.error('Please log in to add items to your cart.');
        }
    };

    return (
        <>
            {products.map((product: Product) => (
                <CardWrapper key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-contain" />
                    </Link>
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                        <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                        <p className="text-gray-900 font-bold text-sm mt-2">Rs {product.price}</p>
                        <SecondaryButton title="Add to Cart" onClick={() => handleAddToCart(product)} />
                    </div>
                </CardWrapper>
            ))}
        </>
    );
}
