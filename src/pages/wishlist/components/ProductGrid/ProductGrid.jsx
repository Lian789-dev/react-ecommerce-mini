import { useProductStore } from "@/store/useProductStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const getProductById = useProductStore((state) => state.getProductById);
  const wishlistIds = useWishlistStore((state) => state.wishlistIds);
  const product = wishlistIds.map((item) => getProductById(item));

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {product.map((item) => (
          <ProductCard item={item} />
        ))}
      </div>
    </div>
  );
}
