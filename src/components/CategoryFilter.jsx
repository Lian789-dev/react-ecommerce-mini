export default function CategoryFilter({
  products,
  selectedCategory,
  onSelectCategory,
}) {
  const categories = [
    ...new Set(products.map((product) => product.category).filter(Boolean)),
  ];

  return (
    <div className="w-full px-[5%] pt-4">
      <h2 className="text-lg font-bold text-slate-900">Trending Category</h2>
      <div className="flex gap-4 overflow-x-auto scroll-smooth py-4">
        {categories.map((category) => {
          const sampleProduct = products.find(
            (item) => item.category === category
          );
          const isActive = selectedCategory === category;

          return (
            <CategoryCard
              key={category}
              category={category}
              image={sampleProduct?.image}
              isActive={isActive}
              onSelect={() =>
                onSelectCategory(
                  selectedCategory === category ? "All" : category
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function CategoryCard({ category, image, isActive, onSelect }) {
  return (
    <button
      type="button"
      className={`group flex w-20 flex-none cursor-pointer flex-col items-center rounded-xl p-1.5 transition-all ${
        isActive
          ? "border-2 border-green-600 bg-green-50/50 shadow-sm"
          : "border-2 border-transparent hover:bg-slate-50"
      }`}
      onClick={onSelect}
      aria-label={`Select ${category} category`}
    >
      <div
        className={`h-16 w-16 flex-none overflow-hidden rounded-full bg-slate-100 transition-all ${
          isActive ? "border-green-600" : "border-transparent"
        }`}
      >
        <img
          src={image || "/placeholder.png"}
          alt={category}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <span
        className={`mt-2 w-full truncate text-center text-xs font-semibold transition-colors ${
          isActive
            ? "font-bold text-green-700"
            : "text-slate-700 group-hover:text-green-700"
        }`}
      >
        {category}
      </span>
    </button>
  );
}
