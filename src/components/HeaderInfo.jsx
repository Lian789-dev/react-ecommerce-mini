export default function HeaderInfo({ selectedCategory, onResetCategory }) {
  const isAll = selectedCategory === "All";

  return (
    <div className="flex items-center justify-between px-[5%] pt-4 pb-2">
      <h2 className="text-xl font-bold text-slate-900">
        {isAll ? "Recommendation" : selectedCategory}
      </h2>

      {!isAll && (
        <button
          type="button"
          onClick={onResetCategory}
          className="cursor-pointer text-sm font-semibold text-green-700 transition-all hover:text-green-800 hover:underline"
        >
          Show All
        </button>
      )}
    </div>
  );
}
