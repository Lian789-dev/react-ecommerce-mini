import AddAddressButton from "@/components/AddAddressButton";
export default function ShippingAddressFooter() {
  return (
    <div className="sticky bottom-0 left-0 z-40 w-full border-t border-slate-300 bg-white md:hidden">
      <div className="flex h-16 items-center justify-center p-4">
        <AddAddressButton />
      </div>
    </div>
  );
}
