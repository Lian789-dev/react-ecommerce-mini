import { useCategoryStore } from "@/store/useCategoryStore";

export default function LocationItem({ item }) {
  const selectedLocations = useCategoryStore(
    (state) => state.selectedLocations
  );
  const toggleLocation = useCategoryStore((state) => state.toggleLocation);
  const isChecked = selectedLocations.includes(item);

  return (
    <li className="flex items-center gap-4 text-sm">
      <input
        type="checkbox"
        id={item}
        checked={isChecked}
        onChange={() => toggleLocation(item)}
        className="accent-green-800 hover:cursor-pointer"
      />
      <label htmlFor={item} className="cursor-pointer">
        {item}
      </label>
    </li>
  );
}
