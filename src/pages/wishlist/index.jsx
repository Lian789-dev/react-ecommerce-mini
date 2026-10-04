import { useWishlistStore } from "@/store/useWishlistStore";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import WishlistEmptyState from "./components/WishlistEmptyState";

export default function Wishlist() {
  const wishlistIds = useWishlistStore((state) => state.wishlistIds);
  return (
    <div className="w-full bg-slate-100">
      <Header />
      <div className="mx-auto min-h-[calc(100dvh-65px)] w-full max-w-7xl py-4">
        {wishlistIds.length > 0 ? <ProductGrid /> : <WishlistEmptyState />}
      </div>
    </div>
  );
}
