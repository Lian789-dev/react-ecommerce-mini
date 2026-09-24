import { useParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import CardAction from "./CardAction";
export default function ProductCard() {
  const { id } = useParams();
  const getProductById = useProductStore((state) => state.getProductById);
  const product = getProductById(id);

  return (
    <div className="flex w-full flex-col border-b border-slate-300 bg-white shadow-md sm:flex-row sm:gap-4 sm:rounded-md sm:border sm:p-4">
      <div className="w-full overflow-hidden sm:max-w-80 sm:rounded-md">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col px-4 py-6 sm:p-0">
        <h1 className="line-clamp-2 text-xl font-bold text-slate-900">
          {product.name}
        </h1>
        <div className="flex w-fit items-center gap-1 px-1 py-0.5 text-base text-slate-500">
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
          <span>{product.rating}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-2xl font-extrabold text-green-700">
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          <span className="text-xs font-medium text-slate-500">
            {product.sold} {product.sold > 1 ? "Units Sold" : "Unit Sold"}
          </span>
        </div>
        <CardAction product={product} />
      </div>
    </div>
  );
}
