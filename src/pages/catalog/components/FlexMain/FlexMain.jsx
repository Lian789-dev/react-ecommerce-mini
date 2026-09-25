import { useParams, useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductStore";
import { useModalStore } from "@/store/useModalStore";

export default function FlexMain() {
  const { categoryName } = useParams();
  const getProductByCategory = useProductStore(
    (state) => state.getProductByCategory
  );

  const selectedLocations = useCategoryStore(
    (state) => state.selectedLocations
  );
  const sortBy = useCategoryStore((state) => state.sortBy);
  const setSortBy = useCategoryStore((state) => state.setSortBy);
  const onOpenModal = useModalStore((state) => state.onOpenModal);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const product = getProductByCategory(categoryName || "") || [];
  let filteredProducts = product.filter((item) => {
    const matchCategory = categoryName
      ? item.category.toLowerCase() === categoryName.toLowerCase()
      : true;
    const matchesSearch = searchQuery
      ? item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(item.location);
    return matchCategory && matchLocation && matchesSearch;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "favorite":
        return (b.rating || 0) - (a.rating || 0);
      case "latest":
        return b.id - a.id;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full flex-1">
      {searchQuery && (
        <div className="hidden p-4 text-slate-800 md:block">
          <p>
            Search result for '
            <span className="text-green-700">{searchQuery}</span>'
          </p>
        </div>
      )}
      <div className="flex w-full scrollbar-thin items-center gap-4 overflow-x-auto rounded-md border border-slate-300 bg-slate-200 p-3">
        <button
          type="button"
          onClick={() => onOpenModal("sidebar-mobile")}
          aria-label="Open Modal"
          className="rounded-md border border-slate-300 bg-white p-2 shadow-sm md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setSortBy("favorite")}
          aria-label="Sort By Favorite"
          className={`cursor-pointer rounded-md border border-slate-300 px-4 py-1.5 shadow-md active:bg-green-800 active:text-white ${sortBy === "favorite" ? "bg-green-700 text-white" : "bg-white text-slate-800"}`}
        >
          Favorite
        </button>
        <button
          type="button"
          onClick={() => setSortBy("latest")}
          aria-label="Sort By Latest"
          className={`cursor-pointer rounded-md border border-slate-300 px-4 py-1.5 shadow-md active:bg-green-800 active:text-white ${sortBy === "latest" ? "bg-green-700 text-white" : "bg-white text-slate-800"}`}
        >
          Latest
        </button>
        <select
          value={sortBy.startsWith("price") ? sortBy : ""}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort By Price"
          className={`rounded-md border-slate-300 bg-white px-4 py-1.5 shadow-md ${sortBy.startsWith("price") ? "text-green-700 " : "text-slate-800"}`}
        >
          <option disabled hidden>
            Price
          </option>
          <option value="price-high">Price: High to Low</option>
          <option value="price-low">Price: Low to High</option>
        </select>
      </div>
      <div className="py-4">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
