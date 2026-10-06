export default function ProductCard({ order }) {
  return (
    <li
      key={order.id}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-xs text-slate-500">
        <span>
          Order ID:{" "}
          <strong className="text-slate-700">{order.id.slice(0, 8)}...</strong>
        </span>
        <span className="rounded bg-blue-50 px-2 py-0.5 font-semibold text-blue-600 capitalize">
          {order.paymentMethod || "Qris"}
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {order.items?.map((product, idx) => (
          <div key={product.id || idx} className="flex items-center gap-4 p-4">
            <div className="relative aspect-square w-20 flex-none overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <p className="line-clamp-1 text-sm font-semibold text-slate-800">
                {product.name}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">
                  Rp{Number(product.price).toLocaleString("id-ID")}
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-600">
                  {product.quantity}x
                </span>
              </div>
              <div>
                <span className="mt-1 inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600 capitalize">
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-4 py-3">
        <span className="text-xs font-semibold text-slate-500">
          Total Belanja
        </span>
        <span className="text-base font-bold text-emerald-600">
          Rp{Number(order.totalAmount).toLocaleString("id-ID")}
        </span>
      </div>
    </li>
  );
}
