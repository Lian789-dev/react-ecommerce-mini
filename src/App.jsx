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
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenMobileSearch, setIsOpenMobileSearch] = useState(false);
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
  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleLayoutChange = (e) => {
      if (e.matches) {
        const isMobileFocused =
          document.activeElement === mobileSearchInputRef.current;
        setIsOpenMobileSearch(false);
        if (isMobileFocused) {
          setTimeout(() => {
            desktopSearchInputRef.current?.focus();
          }, 50);
        }
      } else {
        const isDesktopFocused =
          document.activeElement === desktopSearchInputRef.current;

        if (isDesktopFocused) {
          setIsOpenMobileSearch(true);
        }
      }
    };
    mediaQuery.addEventListener("change", handleLayoutChange);
    return () => mediaQuery.removeEventListener("change", handleLayoutChange);
  }, [isOpenMobileSearch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        inputRef={desktopSearchInputRef}
        cart={cart}
        selectedProduct={selectedProduct}
        isOpenCart={isOpenCart}
        onOpenCart={() => setIsOpenCart(true)}
        onOpenMobileSearch={() => setIsOpenMobileSearch(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchResult={handleSearchResult}
        onClose={() => setSelectedProduct(null)}
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
              onSelectedProduct={() => setSelectedProduct}
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
            />
          </>
        )}
      </main>
      {isOpenMobileSearch && (
        <MobileSearchDrawer
          inputRef={mobileSearchInputRef}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchResult={handleSearchResult}
          onClose={() => setIsOpenMobileSearch(false)}
        />
      )}
      {isOpenCart && (
        <CartDrawer
          cart={cart}
          onChangeQuantity={handleQuantityChange}
          onClose={() => setIsOpenCart(false)}
        />
      )}
      {selectedProduct && (
        <ProductDetailView
          product={selectedProduct}
          onOpenMobileSearch={() => setIsOpenMobileSearch(true)}
          onOpenCart={() => setIsOpenCart(true)}
          onAddToCart={handleAddToCart}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
}
