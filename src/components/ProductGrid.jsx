export default function ProductGrid({ products, onSelectedProduct }) {
  return (
    <section className="min-h-[50dvh] px-[5%] py-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectedProduct={onSelectedProduct}
          />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, onSelectedProduct }) {
  return (
    <div
      onClick={() => onSelectedProduct(product)}
      role="button"
      className="group cursor-pointer overflow-hidden rounded-md border border-slate-200 shadow-sm transition-all hover:border-green-700 hover:shadow-md"
    >
      <div className="aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-2.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
          {product.name}
        </h3>
        <p className="text-base font-bold text-green-700">
          Rp{product.price.toLocaleString("id-ID")}
        </p>
        <div className="flex items-center gap-2 text-xs">
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
            <span>{product.rating}</span>
          </div>
          <span className="text-slate-400">|</span>
          <span className="line-clamp-2 truncate text-xs text-slate-800">
            {product.sold} {product.sold > 1 ? "Units Sold" : "Unit Sold"}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-800">
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="More Option"
              className="shrink-0 rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </button>
            <p className="truncate">{product.location}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
        {/* <ProductCardAction product={product} onAddToCart={onAddToCart} /> */}
      </div>
    </div>
  );
}

// function ProductCardAction({ product, onAddToCart }) {
//   return (
//     <div className="mt-auto flex items-stretch gap-2 pt-4">
//       <button
//         type="button"
//         aria-label="Chat The Seller"
//         className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-700 transition-colors hover:border-green-700 hover:bg-green-700 hover:text-white"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="h-5 w-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
//           />
//         </svg>
//       </button>
//       <button
//         type="button"
//         onClick={() => onAddToCart(product)}
//         aria-label="Add To Cart"
//         className="cursor-pointer rounded-lg border border-slate-300 p-2 text-slate-700 transition-colors hover:border-green-700 hover:bg-green-700 hover:text-white"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth="1.5"
//           stroke="currentColor"
//           className="h-5 w-5"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//           />
//         </svg>
//       </button>
//       <button
//         type="button"
//         aria-label="Buy Product"
//         className="flex-1 cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-center text-xs font-semibold text-slate-700 transition-colors hover:border-green-700 hover:bg-green-700 hover:text-white"
//       >
//         Buy Now
//       </button>
//     </div>
//   );
// }
