import { useState } from "react";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import ProductCards from "./components/ProductCards";
import Toast from "./components/Toast";
import CategoryFilter from "./components/CategoryFilter";
import HeaderInfo from "./components/HeaderInfo";
import initialProducts from "./data/products.json";

export default function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) =>
    selectedCategory === "All" ? true : product.category === selectedCategory
  );

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
    setToastMessage(`"${newItem.name}" added to cart!`);
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
      <CategoryFilter
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <HeaderInfo
        selectedCategory={selectedCategory}
        onResetCategory={() => setSelectedCategory("All")}
      />
      <ProductCards products={filteredProducts} onAddToCart={handleAddToCart} />
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
