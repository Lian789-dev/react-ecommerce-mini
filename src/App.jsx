import { useState, useRef, useEffect } from "react";
import initialProducts from "./data/products.json";
import Navbar from "./components/Navbar";
import MobileSearchDrawer from "./components/MobileSearchDrawer";
import CartDrawer from "./components/CartDrawer";
import SectionHeader from "./components/SectionHeader";
import ProductGrid from "./components/ProductGrid";
import CategoryFilter from "./components/CategoryFilter";
import ProductDetailView from "./components/ProductDetailView";
import CheckoutModal from "./components/CheckoutModal";
import { OrderSuccessModal } from "./components/OrderSuccessModal";
import Toast from "./components/Toast";

export default function App() {
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopping_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Gagal membaca localStorage:", error);
      return [];
    }
  });
  const defaultAddress = {
    name: "Lian",
    telp: "085724720023",
    fullAddress: "Jawa Barat, Majalengka, xxx, xxx",
  };

  const [address, setAddress] = useState(() => {
    try {
      const saved = localStorage.getItem("user_address");
      const parsed = saved ? JSON.parse(saved) : null;

      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
      return defaultAddress;
    } catch {
      return defaultAddress;
    }
  });
  const [orders, setOrders] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const filteredProducts = products.filter((product) =>
    selectedCategory === "All" ? true : product.category === selectedCategory
  );

  const desktopSearchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  function handleAddToCart(newItem) {
    const addQty = newItem.quantity || 1;
    setCart((prevCart) => {
      const isExist = prevCart.find((product) => product.id === newItem.id);
      if (isExist) {
        return prevCart.map((product) =>
          product.id === newItem.id
            ? { ...product, quantity: product.quantity + addQty }
            : product
        );
      }
      return [...prevCart, { ...newItem, quantity: addQty, checked: true }];
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

  function handleChecked(productId, checked) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id == productId ? { ...item, checked: !checked } : item
      )
    );
  }

  function handleUpdateAddress(newAddress) {
    setAddress(newAddress);
    setToastMessage("Address updated successfully!");
  }
  function handleOrderSuccess(newOrder) {
    setOrders((prevOrder) => [newOrder, ...prevOrder]);
    setCart((prevCart) => prevCart.filter((item) => item.checked !== true));
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
  console.log(address);

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("user_address", JSON.stringify(address));
  }, [address]);
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        inputRef={desktopSearchInputRef}
        cart={cart}
        selectedProduct={selectedProduct}
        onOpenCart={() => setActiveModal("cart")}
        onOpenMobileSearch={() => setActiveModal("mobile search")}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchResult={handleSearchResult}
        onClose={() => {
          setSelectedProduct(null);
          setActiveModal(null);
        }}
      />
      <main>
        {activeSearchQuery ? (
          <>
            <SectionHeader
              searchQuery={activeSearchQuery}
              resultCount={searchResult.length}
              onClose={() => {
                setActiveSearchQuery(null);
                setSearchQuery("");
              }}
            />
            <ProductGrid
              products={searchResult}
              onSelectedProduct={setSelectedProduct}
              onActiveModal={() => setActiveModal("product detail")}
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
              onSelectedProduct={setSelectedProduct}
              onActiveModal={() => setActiveModal("product detail")}
            />
          </>
        )}
      </main>

      {activeModal === "mobile search" && (
        <MobileSearchDrawer
          inputRef={mobileSearchInputRef}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchResult={handleSearchResult}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "cart" && (
        <CartDrawer
          cart={cart}
          onChangeQuantity={handleQuantityChange}
          onChecked={handleChecked}
          onCheckout={() => setActiveModal("checkout")}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "product detail" && (
        <ProductDetailView
          product={selectedProduct}
          onOpenMobileSearch={() => setActiveModal("mobile search")}
          onOpenCart={() => setActiveModal("cart")}
          onAddToCart={handleAddToCart}
        />
      )}
      {activeModal === "checkout" && (
        <CheckoutModal
          products={cart.filter((item) => item.checked === true)}
          address={address}
          onUpdateAddress={handleUpdateAddress}
          onOrderSuccess={handleOrderSuccess}
          onOpenOrderSuccess={() => setActiveModal("checkout success")}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "checkout success" && (
        <OrderSuccessModal
          item={orders[0]}
          onClose={() => setActiveModal(null)}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
