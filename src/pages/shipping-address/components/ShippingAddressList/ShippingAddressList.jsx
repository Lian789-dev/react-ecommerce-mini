import { useCheckoutStore } from "@/store/useCheckoutStore";
import ShippingAddressCard from "./ShippingAddressCard";

export default function ShippingAddressList() {
  const address = useCheckoutStore((state) => state.address);
  return (
    <div className="flex flex-col gap-2">
      {address.map((item) => (
        <ShippingAddressCard key={item.id} item={item} />
      ))}
    </div>
  );
}
