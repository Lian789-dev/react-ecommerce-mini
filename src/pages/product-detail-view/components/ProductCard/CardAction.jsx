import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import { useModalStore } from "@/store/useModalStore";

export default function CardAction() {
  const getProductById = useProductStore((state) => state.getProductById);
  const onAddToCart = useCartStore((state) => state.onAddToCart);
  const onOpenModal = useModalStore((state) => state.onOpenModal);
  const { id } = useParams();
  const product = getProductById(id);

  return (
    <div className="mt-5 hidden gap-2 border-t border-slate-300 py-4 sm:flex">
      <button
        type="button"
        onClick={() => onOpenModal("product-options")}
        aria-label="Chat The Seller"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 p-2 text-green-700 shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => {
          onAddToCart(product);
          toast.success(`${product.name} added to cart`);
        }}
        aria-label="Add To Cart"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 p-2 text-green-700 shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Buy Product"
        onClick={() => onOpenModal("product-options")}
        className="w-full max-w-52 cursor-pointer rounded-md border border-slate-300 bg-green-700 px-7 py-2 text-white hover:bg-green-800 active:bg-green-900"
      >
        Buy Now
      </button>
    </div>
  );
}
