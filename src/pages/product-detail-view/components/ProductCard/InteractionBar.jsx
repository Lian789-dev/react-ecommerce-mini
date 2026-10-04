import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export default function InteractionBar() {
  const getProductById = useProductStore((state) => state.getProductById);
  const onToggleWishlist = useWishlistStore((state) => state.onToggleWishlist);
  const wishlistIds = useWishlistStore((state) => state.wishlistIds);
  const { id } = useParams();
  const product = getProductById(id);
  const wishlistExist = wishlistIds.find((item) => item === product.id);

  function handleWishlist() {
    if (wishlistExist) {
      onToggleWishlist(product.id);
      toast.success("Successfully remove to the wishlist");
      return;
    }
    onToggleWishlist(product.id);
    toast.success("Successfully added to the wishlist");
  }
  return (
    <div className="flex items-center gap-4 md:gap-2">
      <button
        type="button"
        onClick={handleWishlist}
        aria-label="Toggle Wishlist"
        className="p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={wishlistExist ? "red" : "white"}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
      </button>
    </div>
  );
}
