import { useState } from "react";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ProductCards from "./components/ProductCards";
import Toast from "./components/Toast";
import initialProducts from "./data/products.json";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function handleAddToCart(newItem) {
    setCart((prevCart) => {
      const isExist = prevCart.find((product) => product.id === newItem.id);
      if (isExist) {
        return prevCart.map((product) =>
          product.id === newItem.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }
      return [...prevCart, { ...newItem, quantity: 1 }];
    });
    setToastMessage(`"${newItem.name}" berhasil ditambahkan!`);
  }

  function handleQuantityChange(productId, newQuantity) {
    const qty = parseInt(newQuantity, 10);

    if (qty === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      return;
    }

    if (isNaN(qty) || qty < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  }

  function handleIsOpenCart() {
    setIsOpenCart(!isOpenCart);
  }
  function handleCloseToast() {
    setToastMessage("");
  }
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cart={cart} onIsOpenCart={handleIsOpenCart} />
      <HeaderInfo />
      <ProductCards products={products} onAddToCart={handleAddToCart} />
      <CartDrawer
        isOpenCart={isOpenCart}
        cart={cart}
        onChangeQuantity={handleQuantityChange}
      />
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}
    </div>
  );
}
function HeaderInfo() {
  return (
    <h2 className="px-[5%] pt-4 text-xl font-bold text-slate-900">
      Rekomendasi
    </h2>
  );
}
