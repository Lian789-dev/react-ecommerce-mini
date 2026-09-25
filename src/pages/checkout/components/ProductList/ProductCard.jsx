export default function ProductCard({ product }) {
  return (
    <li className="w-full rounded-lg border border-slate-300 bg-white p-4 shadow-md">
      <div className="flex w-full gap-2">
        <div className="w-24 flex-none">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <p className="line-clamp-2 text-base font-semibold">{product.name}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-green-700">
              Rp{product.price.toLocaleString("id-ID")}
            </p>
            <span className="text-sm text-slate-500">{product.quantity}x</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-300 pt-4 pb-2">
        <p className="font-semibold">
          Total {product.quantity}{" "}
          {product.quantity > 1 ? "products" : "product"}
        </p>
        <p className="font-bold text-green-700">
          Rp{(product.price * product.quantity).toLocaleString("id-ID")}
        </p>
      </div>
    </li>
  );
}
