import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "@/store/useCategoryStore";
import CategoryItem from "./CategoryItem";
export default function CategoryList() {
  const categories = useCategoryStore((state) => state.categories);

  const navigate = useNavigate();
  return (
    <ul className="flex flex-col gap-2 p-2">
      {categories.map((item) => (
        <CategoryItem
          key={item}
          item={item}
          onSelect={() => {
            navigate(`/category/${item}`);
          }}
        />
      ))}
    </ul>
  );
}
