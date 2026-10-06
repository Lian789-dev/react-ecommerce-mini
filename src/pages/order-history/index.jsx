import Header from "./components/Header";
import ProductList from "./components/ProductList";

export default function OrderHistory() {
  return (
    <div className="w-full bg-slate-100">
      <Header />
      <div className="mx-auto min-h-[calc(100dvh-110px)] w-full max-w-7xl px-4">
        <ProductList />
      </div>
    </div>
  );
}
