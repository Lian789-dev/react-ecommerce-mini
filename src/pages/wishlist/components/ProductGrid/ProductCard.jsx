import { useNavigate } from "react-router-dom";
import CardAction from "./CardAction";

export default function ProductCard({ item }) {
  const navigate = useNavigate();
  return (
    <div
      key={item.id}
      onClick={() => {
        navigate(`/detail/${item.id}`);
      }}
      role="button"
      className="group relative cursor-pointer overflow-hidden rounded-md border border-slate-300 bg-white pb-6 shadow-md transition-all hover:border-green-700 hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-2.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
          {item.name}
        </h3>
        <p className="text-base font-bold text-green-700">
          Rp{item.price.toLocaleString("id-ID")}
        </p>
        <div className="mb-4 flex items-center gap-2 text-xs">
          <div className="flex w-fit items-center gap-1 rounded-sm border border-slate-300 px-1 py-0.5 text-slate-800 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="orange"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="orange"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <span>{item.rating}</span>
          </div>
          <span className="text-slate-400">|</span>
          <span className="line-clamp-2 truncate text-xs text-slate-800">
            {item.sold} {item.sold > 1 ? "Units Sold" : "Unit Sold"}
          </span>
        </div>
      </div>
      <CardAction item={item} />
    </div>
  );
}
