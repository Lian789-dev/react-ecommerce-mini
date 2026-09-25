import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useModalStore } from "@/store/useModalStore";
import AddressFormModal from "@/components/AddressFormModal";
import ShippingAddressHeader from "./components/ShippingAddressHeader";
import ShippingAddressList from "./components/ShippingAddressList";
import ShippingAddressEmptyState from "./components/ShippingAddressEmptyState";
import ShippingAddressFooter from "./components/ShippingAddressFooter";

export default function ShippingAddress() {
  const address = useCheckoutStore((state) => state.address);
  const activeModal = useModalStore((state) => state.activeModal);
  return (
    <div className="h-full w-full bg-slate-100">
      <ShippingAddressHeader />
      <main className="mx-auto min-h-[calc(100dvh-130px)] w-full max-w-7xl px-4 py-6 sm:px-6 md:min-h-[calc(100dvh-65px)] lg:px-8">
        {address.length > 0 ? (
          <ShippingAddressList />
        ) : (
          <ShippingAddressEmptyState />
        )}
      </main>
      <ShippingAddressFooter />
      {activeModal === "add-address" && <AddressFormModal />}
    </div>
  );
}
