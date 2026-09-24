import { useProductStore } from "@/store/useProductStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

export default function CategoryFilter() {
  const products = useProductStore((state) => state.products);
  const categories = useCategoryStore((state) => state.categories);

  const navigate = useNavigate();
  return (
    <div className="w-full">
      <h2 className="text-lg font-bold text-slate-900">Trending Category</h2>
      <div className="flex gap-4 overflow-x-auto scroll-smooth py-4">
        {categories.map((category) => {
          const sampleProduct = products.find(
            (item) => item.category === category
          );

          return (
            <CategoryCard
              key={category}
              category={category}
              image={sampleProduct?.image}
              onSelect={() => navigate(`/category/${category}`)}
            />
          );
        })}
      </div>
    </div>
  );
}
