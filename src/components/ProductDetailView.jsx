import { useState, useEffect } from "react";

export default function ProductDetailView({ product, onAddToCart }) {
  const [activeTab, setActiveTab] = useState("description");
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  return (
    <div className="fixed top-16 left-0 z-30 flex h-[calc(100dvh-64px)] w-full flex-col bg-slate-100">
      <div className="flex-1 overflow-auto px-[5%] py-5">
        <ProductCard product={product} onAddToCart={onAddToCart} />
        <ProductTabs activeTab={activeTab} onActiveTab={setActiveTab} />
        <ProductTabsContent product={product} activeTab={activeTab} />
      </div>
      <DetailFooter product={product} onAddToCart={onAddToCart} />
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="flex w-full flex-col rounded-md bg-white p-2 pb-5 sm:flex-row sm:gap-4">
      <div className="w-full sm:max-w-80">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col">
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
        <CardAction product={product} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}

function CardAction({ product, onAddToCart }) {
  return (
    <div className="mt-5 hidden gap-2 border-t border-slate-300 py-4 sm:flex">
      <button
        type="button"
        aria-label="Chat The Seller"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 p-2 text-green-700 shadow-md"
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
        onClick={() => onAddToCart(product)}
        aria-label="Add To Cart"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-300 p-2 text-green-700 shadow-md"
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
        aria-label="Buy Product"
        className="w-full max-w-52 cursor-pointer rounded-md border border-slate-300 bg-green-700 px-7 py-2 text-white hover:bg-green-800 active:bg-green-900"
      >
        Buy Now
      </button>
    </div>
  );
}

function ProductTabs({ activeTab, onActiveTab }) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
    { id: "specification", label: "Specification" },
  ];
  return (
    <div className="mt-5 flex scrollbar-none gap-4 overflow-x-auto rounded-t-md border-t border-slate-200 bg-white py-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onActiveTab(tab.id)}
          className={`px-6 py-2.5 font-semibold text-slate-800 ${
            activeTab === tab.id
              ? "border-b-2 border-slate-500"
              : "border-b-2 border-transparent"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
function ProductTabsContent({ product, activeTab }) {
  const specifications = [
    {
      id: "stock",
      title: `${product.stock} total product`,
      icon: (
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
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          ></path>
        </svg>
      ),
    },
    {
      id: "rating",
      title: `${product.rating} rating`,
      icon: (
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
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      ),
    },
    {
      id: "location",
      title: `Shipped From ${product.location}`,
      icon: (
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
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="bg-white p-6">
      {activeTab === "description" && (
        <p className="text-sm">{product.description}</p>
      )}
      {activeTab === "reviews" && <p>In Progress</p>}
      {activeTab === "specification" && (
        <div className="flex flex-col gap-2">
          {specifications.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-sm">
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function DetailFooter({ product, onAddToCart }) {
  return (
    <div className="flex flex-none border-t border-slate-200 py-1 sm:hidden">
      <div className="flex flex-1 items-center justify-center bg-white">
        <button
          type="button"
          aria-label="Chat The Seller"
          className="flex h-full w-full flex-1 cursor-pointer items-center justify-center text-green-700 transition-colors hover:bg-slate-100"
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
        <span className="h-5 border border-slate-400"></span>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          aria-label="Add To Cart"
          className="flex h-full w-full flex-1 cursor-pointer items-center justify-center text-green-700 transition-colors hover:bg-slate-100"
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
      </div>
      <button
        type="button"
        aria-label="Buy Product"
        className="flex-1 cursor-pointer bg-green-700 py-1 text-center text-white"
      >
        <p className="text-sm">Buy Now</p>
        <p className="text-base font-semibold">
          Rp {product.price.toLocaleString("id-ID")}
        </p>
      </button>
    </div>
  );
}
