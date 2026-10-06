import { useSearchParams } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./ProuductCard";
export default function ProductList() {
  const orderHistory = useProductStore((state) => state.orderHistory);
  const [searchParams] = useSearchParams();
  const tabName = searchParams.get("tab") || "";

  const filteredOrders =
    tabName && tabName !== "all"
      ? orderHistory.filter((order) =>
          order.items?.some(
            (item) => item.status?.toLowerCase() === tabName.toLowerCase()
          )
        )
      : orderHistory;
  if (!filteredOrders || filteredOrders.length === 0) {
    return (
      <div className="flex min-h-[calc(100dvh-110px)] w-full flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-20 w-20 text-slate-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
        No order history yet.
      </div>
    );
  }
  return (
    <ul className="mx-auto min-h-[50dvh] w-full max-w-3xl space-y-4 py-4">
      {filteredOrders.map((order) => (
        <ProductCard order={order} />
      ))}
    </ul>
  );
}
