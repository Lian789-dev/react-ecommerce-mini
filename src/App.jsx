import { useState } from "react";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import SectionHeader from "./components/SectionHeader";
import ProductGrid from "./components/ProductGrid";
import Toast from "./components/Toast";
import CategoryFilter from "./components/CategoryFilter";
import initialProducts from "./data/products.json";

export default function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
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

    if (isNaN(qty)) return;
    if (qty <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  }
  function handleSearchResult(query) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setSearchResult([]);
      setActiveSearchQuery("");
      return;
    }
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
    setSearchResult(results);
    setActiveSearchQuery(query);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        cart={cart}
        onToggleCart={() => setIsOpenCart((prev) => !prev)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchResult={handleSearchResult}
      />
      <main>
        {activeSearchQuery ? (
          <>
            <SectionHeader
              searchQuery={activeSearchQuery}
              resultCount={searchResult.length}
            />
            <ProductGrid
              products={searchResult}
              onAddToCart={handleAddToCart}
            />
          </>
        ) : (
          <>
            <CategoryFilter
              products={products}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <SectionHeader
              title={selectedCategory}
              onResetCategory={() => setSelectedCategory("All")}
            />
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </>
        )}
        <CartDrawer
          cart={cart}
          isOpenCart={isOpenCart}
          onChangeQuantity={handleQuantityChange}
        />
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </main>
    </div>
  );
}
