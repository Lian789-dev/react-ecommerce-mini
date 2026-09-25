import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useCartStore } from "@/store/useCartStore";
import { useModalStore } from "@/store/useModalStore";

export default function ButtonOrder() {
  const onOrder = useProductStore((state) => state.onOrder);
  const getCheckedProducts = useCartStore((state) => state.getCheckedProducts);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const removeToCart = useCartStore((state) => state.removeToCart);
  const address = useCheckoutStore((state) => state.address);
  const selectedAddressId = useCheckoutStore(
    (state) => state.selectedAddressId
  );
  const selectedAddress = address.find((addr) => addr.id === selectedAddressId);
  const selectedPayment = useCheckoutStore((state) => state.selectedPayment);
  const onOpenModal = useModalStore((state) => state.onOpenModal);

  const location = useLocation();
  const getBuyNow = location.state;
  const products = getBuyNow ? [getBuyNow] : getCheckedProducts();
  const subtotal = getBuyNow
    ? getBuyNow.price * getBuyNow.quantity
    : getSubtotal();
  const navigate = useNavigate();

  function handlePlaceOrder() {
    if (!selectedAddressId) {
      return toast.error("Shipping address not yet filled in.");
    }

    const formaterItems = products.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: Number(item.quantity),
      price: Number(item.price),
      totalPay: Number(item.price) * Number(item.quantity),
    }));
    const itemPurchased = {
      id: crypto.randomUUID(),
      item: formaterItems,
      address: selectedAddress,
      paymentMethod: selectedPayment,
      totalAmount: subtotal,
    };
    products.map((item) => removeToCart(item.id));
    onOrder(itemPurchased);
    navigate("/");
    onOpenModal("order-success");
  }
  return (
    <button
      type="button"
      onClick={handlePlaceOrder}
      aria-label="Place an Order"
      className="w-full rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-800 active:scale-[0.98]"
    >
      Place an Order
    </button>
  );
}
