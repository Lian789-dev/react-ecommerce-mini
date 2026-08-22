export function OrderSuccessModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl transition-all">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-8 w-8 text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-xl font-bold text-slate-800">
          Order Placed Successfully!
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{item.id}</span>
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Payment Method</span>
            <span className="font-semibold text-slate-800 uppercase">
              {item.paymentMethod}
            </span>
          </div>
          <div className="mt-2 flex justify-between text-slate-600">
            <span>Total Paid</span>
            <span className="font-bold text-green-700">
              Rp{item.totalAmount?.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full cursor-pointer rounded-xl bg-green-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 active:scale-[0.98]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
