import { useLocation } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const getCheckedProducts = useCartStore((state) => state.getCheckedProducts);
  const location = useLocation();
  const getBuyNow = location.state;
  const products = getBuyNow ? [getBuyNow] : getCheckedProducts();

  return (
    <ul className="flex w-full flex-1 flex-col gap-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
