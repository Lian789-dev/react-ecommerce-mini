import { useLocation } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import ButtonOrder from "@/components/ButtonOrder";
export default function PaymentDetails() {
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const location = useLocation();
  const getBuyNow = location.state;
  const subtotal = getBuyNow
    ? getBuyNow.price * getBuyNow.quantity
    : getSubtotal();
  const subtotalFormater = subtotal.toLocaleString("id-ID");
  return (
    <div className="w-full rounded-lg border border-slate-300 bg-white px-4 shadow-xs">
      <h2 className="py-3 text-base font-bold">Payment Details</h2>
      <div className="flex items-center justify-between text-sm">
        <p>Subtotal Pesanan</p>
        <p>Rp{subtotalFormater}</p>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-slate-300 py-2 font-bold">
        <p>Total Payment</p>
        <p>Rp{subtotalFormater}</p>
      </div>
      <div className="hidden pt-2 pb-4 md:block">
        <ButtonOrder />
      </div>
    </div>
  );
}
