import { useParams, useSearchParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import LocationItem from "./LocationItem";
export default function LocationList() {
  const getProductByCategory = useProductStore(
    (state) => state.getProductByCategory
  );
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const product = getProductByCategory(categoryName || "") || [];
  const searchFilteredProducts = product.filter((item) => {
    if (!searchQuery) return true;
    return (
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const locationList = [
    ...new Set(
      searchFilteredProducts.map((item) => item.location).filter(Boolean)
    ),
  ];
  return (
    <ul className="flex flex-col gap-2 p-2">
      <li>
        <h2 className="font-semibold">Location</h2>
      </li>
      {locationList.map((item) => (
        <LocationItem key={item} item={item} />
      ))}
    </ul>
  );
}
