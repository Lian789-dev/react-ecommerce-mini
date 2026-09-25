import { useModalStore } from "../store/useModalStore";

export default function AddAddressButton() {
  const onOpenModal = useModalStore((state) => state.onOpenModal);

  return (
    <button
      type="button"
      onClick={() => onOpenModal("add-address")}
      aria-label="Open Modal"
      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border px-4 py-2 font-semibold text-green-700"
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
      <span>Add a New Address</span>
    </button>
  );
}
