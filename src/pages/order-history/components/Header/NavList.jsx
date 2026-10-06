import { useSearchParams, useNavigate } from "react-router-dom";

export default function NavList() {
  const navItems = ["All", "Packaged", "Sent", "in Delivery", "Finished"];
  const [searchParams] = useSearchParams();
  const tabName = searchParams.get("tab") || "";
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-4 px-4 py-2">
        {navItems.map((item) => {
          const isActiveTab =
            item.toLocaleLowerCase() === tabName.toLocaleLowerCase();
          return (
            <button
              key={item}
              type="button"
              onClick={() => navigate(`?tab=${item.toLocaleLowerCase()}`)}
              className={`cursor-pointer transition-colors ${isActiveTab && "cursor-pointer border-b-2 border-green-600 text-green-600"}`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
