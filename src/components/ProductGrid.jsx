export default function ProductGrid({
  products,
  onAddToCart,
  subTitle,
  onResetCategory,
}) {
  return (
    <section className="min-h-[50dvh] px-[5%] py-4">
      <SectionHeader subTitle={subTitle} onResetCategory={onResetCategory} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ subTitle, onResetCategory }) {
  const isAll = subTitle === "All";

  return (
    <div className="flex items-center justify-between py-4">
      <h2 className="text-xl font-bold text-slate-900">
        {isAll ? "Recommendation" : subTitle}
      </h2>
      {!isAll && (
        <button
          type="button"
          className="cursor-pointer text-sm font-semibold text-green-700 transition-all hover:text-green-800 hover:underline"
          onClick={onResetCategory}
          aria-label="Show All Product"
        >
          Show All
        </button>
      )}
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-green-700 hover:shadow-md">
      <div className="h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-base font-bold text-green-700">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
        <ActionCard product={product} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}

function ActionCard({ product, onAddToCart }) {
  return (
    <div className="mt-auto flex items-stretch gap-2 pt-4">
      <button
        type="button"
        className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-700 transition-colors hover:border-green-700 hover:bg-green-700 hover:text-white"
        aria-label="Chat The Seller"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </button>
      <button
        type="button"
        className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-700 transition-colors hover:border-green-700 hover:bg-green-700 hover:text-white"
        onClick={() => onAddToCart(product)}
        aria-label="Add To Cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </button>
      <button
        type="button"
        className="flex-1 cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-green-700 hover:bg-green-700 hover:text-white"
        aria-label="Buy Product"
      >
        Buy Now
      </button>
    </div>
  );
}
