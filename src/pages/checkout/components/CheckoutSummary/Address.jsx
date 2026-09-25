import { useNavigate } from "react-router-dom";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useModalStore } from "@/store/useModalStore";

export default function Address() {
  const onOpenModal = useModalStore((state) => state.onOpenModal);
  const selectedAddressId = useCheckoutStore(
    (state) => state.selectedAddressId
  );
  const address = useCheckoutStore((state) => state.address);
  const selectedAddress =
    address.find((addr) => addr.id === selectedAddressId) || null;
  const navigate = useNavigate();

  function handleAddress() {
    if (selectedAddress === null && address.length > 0) {
      navigate("/shipping-addresses");
    } else {
      onOpenModal("add-address");
    }
  }
  return (
    <div className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-xs transition-colors hover:bg-slate-200">
      {!selectedAddress ? (
        <button
          type="button"
          onClick={handleAddress}
          aria-label="Selected Address"
          className="flex w-full items-center justify-center gap-3 font-semibold text-green-700"
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add New Shipping Address</span>
        </button>
      ) : (
        <div
          onClick={() => navigate("/shipping-addresses")}
          role="button"
          aria-label="Update Address"
          className="relative flex gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="m-0.5 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <div className="flex-1">
            <p className="font-bold">
              {selectedAddress.name}{" "}
              <span className="text-xs font-normal">{`(${selectedAddress.telp})`}</span>
            </p>
            <p className="text-sm text-slate-500">
              {selectedAddress.otherDetails}
            </p>
          </div>
          <span className="absolute top-3/6 right-0 -translate-y-1/2">
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}
