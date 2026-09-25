export default function ProductEmptyState() {
  return (
    <div className="flex h-[calc(100dvh-65px)] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-100 text-center shadow-xs">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-800">
        Product Not Found
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Try using different search keywords or selecting a different category.
      </p>
    </div>
  );
}
