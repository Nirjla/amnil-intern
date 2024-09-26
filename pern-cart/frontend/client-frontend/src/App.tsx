import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Signin from "./components/pages/Signin";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";

export default function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout/>} />
    </Routes>
  </>)
}