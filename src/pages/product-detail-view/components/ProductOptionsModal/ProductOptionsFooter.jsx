import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { useModalStore } from "@/store/useModalStore";

export default function ProductOptionsFooter() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const getProductById = useProductStore((state) => state.getProductById);
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  const product = getProductById(id);

  function handleSubmit(e) {
    e.preventDefault();
    const currentQty = Number(quantity);

    if (quantity === "" || currentQty < 1) {
      toast.error("Minimal pembelian adalah 1 item");
      return;
    }

    if (currentQty > product.stock) {
      toast.error("Melebihi stok yang tersedia");
      setQuantity(product.stock);
      return;
    }

    onCloseModal();
    navigate("/checkout", {
      state: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: currentQty,
      },
    });
  }

  const handleIncrease = () => {
    if (Number(quantity) >= product.stock) {
      return toast.error(
        `You can purchase a maximum of ${product.stock} items.`
      );
    }
    setQuantity((prev) => (prev === "" ? 1 : Number(prev) + 1));
  };

  const handleDecrease = () => {
    if (Number(quantity) <= 1) return;
    setQuantity((prev) => Number(prev) - 1);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === "") return setQuantity("");

    const num = Number(val);
    if (!isNaN(num)) {
      if (num > product.stock) {
        toast.error("Exceeds available stock");
        setQuantity(product.stock);
      } else {
        setQuantity(num);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-slate-300">
      <div className="flex items-center justify-between py-4">
        <p className="text-sm font-medium text-slate-700">Quantity</p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={Number(quantity) <= 1}
            aria-label="Decrease Quantity"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-slate-200 text-slate-700 shadow-sm hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
            className="h-7 w-12 [appearance:textfield] rounded-md text-center text-sm font-semibold outline-none focus:ring-2 focus:ring-green-600 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={handleIncrease}
            disabled={Number(quantity) >= product.stock}
            aria-label="Increase Quantity"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-300 bg-slate-200 text-slate-700 shadow-sm hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={quantity === "" || Number(quantity) < 1}
        className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:active:scale-100"
      >
        Buy Now
      </button>
    </form>
  );
}
