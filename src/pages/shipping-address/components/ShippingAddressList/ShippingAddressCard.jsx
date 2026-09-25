import { useCheckoutStore } from "@/store/useCheckoutStore";

export default function ShippingAddressCard({ item }) {
  const selectedAddressId = useCheckoutStore(
    (state) => state.selectedAddressId
  );
  const onSelectedAddressId = useCheckoutStore(
    (state) => state.onSelectedAddressId
  );
  const onRemoveAddress = useCheckoutStore((state) => state.onRemoveAddress);
  return (
    <div className="flex flex-col items-start gap-3 rounded-md border border-slate-300 bg-white p-4 shadow-md">
      <div className="flex w-full justify-between border-b border-slate-300 pb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{item.name}</span>
          <span>|</span>
          <span className="w-fit font-semibold text-slate-600">
            {item.telp}
          </span>
        </div>

        <div className="flex gap-2 text-green-700">
          <button className="cursor-pointer">Edit</button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => onRemoveAddress(item.id)}
            aria-label="Remove Shipping Address"
            className="cursor-pointer text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-slate-600">
        {item.street}, {item.city}, {item.otherDetails}
      </p>
      <div>
        {selectedAddressId === item.id ? (
          <span className="flex items-center justify-center rounded-md border border-green-700 px-2 py-0.5 font-semibold text-green-700">
            Main
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onSelectedAddressId(item.id)}
            aria-label="Set as Main Address"
            className="cursor-pointer rounded-md border border-slate-300 bg-green-700 px-4 py-0.5 text-white shadow-md"
          >
            Set as main
          </button>
        )}
      </div>
    </div>
  );
}
