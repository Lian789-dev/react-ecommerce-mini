import { useNavigate } from "react-router-dom";
import AddAddressButton from "@/components/AddAddressButton";
export default function ShippingAddressHeader() {
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="sticky top-0 left-0 z-40 w-full border-b border-slate-300 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back"
            className="text-slate-800 hover:text-slate-500"
          >
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <h1 className="text-base font-bold text-slate-800">
            Shipping Address
          </h1>
        </div>
        <div className="hidden md:block">
          <AddAddressButton />
        </div>
      </div>
    </div>
  );
}
