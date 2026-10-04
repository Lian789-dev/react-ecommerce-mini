import { useNavigate } from "react-router-dom";

export default function WishlistEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="flex h-[calc(100dvh-65px)] w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-20 w-20 text-slate-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
          <p className="font-semibold">You do not have any products yet.</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Find Products"
            className="cursor-pointer rounded-md border border-slate-300 bg-green-600 px-4 py-1.5 text-white shadow-md active:bg-green-800"
          >
            Find Products
          </button>
        </div>
      </div>
    </div>
  );
}
