import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductCards from "./components/ProductCards";
import initialProducts from "./data/products.json";
export default function App() {
  const [products, setProducts] = useState(initialProducts);
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <HeaderInfo />
      <ProductCards products={products} />
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
