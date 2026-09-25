import { useLocation } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import ButtonOrder from "@/components/ButtonOrder";

export default function CheckoutFooter() {
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const location = useLocation();
  const getBuyNow = location.state;
  const subtotal = getBuyNow
    ? getBuyNow.price * getBuyNow.quantity
    : getSubtotal();
  const subtotalFormater = subtotal.toLocaleString("id-ID");
  return (
    <div className="sticky bottom-0 left-0 z-40 w-full">
      <div className="mx-auto flex w-full flex-col gap-3 border-t border-slate-300 bg-white p-4 sm:px-6 md:hidden">
        <div className="flex items-center justify-between font-bold">
          <p>Total Payment</p>
          <p className="text-green-700">Rp{subtotalFormater}</p>
        </div>
        <ButtonOrder />
      </div>
    </div>
  );
}
