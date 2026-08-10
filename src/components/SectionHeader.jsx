export default function SectionHeader({
  title,
  searchQuery,
  resultCount,
  onResetCategory,
}) {
  return (
    <div className="px-[5%] pt-4">
      {searchQuery ? (
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-slate-800">
            <div className="rounded-lg bg-green-100 p-2 text-green-700">
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Search results for{" "}
                <span className="text-green-700 italic">'{searchQuery}'</span>
              </p>
              {resultCount !== undefined && (
                <p className="text-xs text-slate-500">
                  {resultCount} products found
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold text-slate-900">
            {title === "All" ? "Recommendation" : title}
          </h2>
          {title !== "All" && onResetCategory && (
            <button
              type="button"
              onClick={onResetCategory}
              className="cursor-pointer text-sm font-semibold text-green-700 transition-colors hover:text-green-800 hover:underline"
            >
              Show All
            </button>
          )}
        </div>
      )}
    </div>
  );
}
