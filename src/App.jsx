import { useState, useRef, useEffect } from "react";
import initialProducts from "./data/products.json";
import Navbar from "./components/Navbar";
import MobileSearchDrawer from "./components/MobileSearchDrawer";
import CartDrawer from "./components/CartDrawer";
import SectionHeader from "./components/SectionHeader";
import ProductGrid from "./components/ProductGrid";
import CategoryFilter from "./components/CategoryFilter";
import ProductDetailView from "./components/ProductDetailView";
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
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(min-width: 640px)");

  //   const handleLayoutChange = (e) => {
  //     if (e.matches) {
  //       // 🟢 1. Masuk Desktop: Tutup modal mobile search karena desktop punya SearchBox sendiri
  //       setActiveModal((prev) => (prev === "mobile search" ? null : prev));

  //       // 🟢 2. Jika input mobile search tadi lagi fokus, pindahkan fokus ke input desktop
  //       if (document.activeElement === mobileSearchInputRef.current) {
  //         setTimeout(() => {
  //           desktopSearchInputRef.current?.focus();
  //         }, 50);
  //       }
  //     } else {
  //       // 🟢 3. Masuk Mobile: Jika input desktop lagi fokus, baru buka drawer mobile search
  //       if (document.activeElement === desktopSearchInputRef.current) {
  //         setActiveModal("mobile search");
  //         setTimeout(() => {
  //           mobileSearchInputRef.current?.focus();
  //         }, 50);
  //       }
  //     }
  //   };

  //   mediaQuery.addEventListener("change", handleLayoutChange);
  //   return () => mediaQuery.removeEventListener("change", handleLayoutChange);
  // }, []);

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
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
