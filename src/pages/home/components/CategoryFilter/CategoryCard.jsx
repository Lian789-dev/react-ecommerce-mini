export default function CategoryCard({ category, image, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Select ${category} category`}
      className="group flex w-20 flex-none cursor-pointer flex-col items-center rounded-md border-2 border-transparent p-1.5 transition-all hover:border-green-700 hover:bg-slate-50 hover:shadow-md"
    >
      <div className="h-16 w-16 flex-none overflow-hidden rounded-full bg-slate-100 transition-all">
        <img
          src={image || "/placeholder.png"}
          alt={category}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <p className="transition-colorstext-slate-700 mt-2 w-full truncate text-center text-xs font-semibold group-hover:text-green-700">
        {category}
      </p>
    </button>
  );
}
