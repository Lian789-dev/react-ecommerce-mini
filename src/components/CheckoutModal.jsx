import { useState } from "react";
import { useEffect } from "react";

export default function CheckoutModal({ products, onClose }) {
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const subtotal = products
    .map((product) => product.price * product.quantity)
    .reduce((sum, product) => sum + product, 0)
    .toLocaleString("id-ID");

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = originalStyle);
  });
  return (
    <div className="fixed top-0 left-0 z-50 h-full w-full bg-slate-50">
      <div className="flex h-full w-full flex-col">
        <Header onClose={onClose} />
        <div className="flex flex-1 flex-col gap-4 overflow-auto px-[5%] py-4 md:flex-row">
          <ProductList products={products} />
          <div className="flex flex-1 flex-col gap-2">
            <Address />
            <PaymentMethod
              selectedPayment={selectedPayment}
              onSelectedPayment={setSelectedPayment}
            />
            <PaymentDetails subtotal={subtotal} />
          </div>
        </div>
        <CheckoutFooter total={subtotal} />
      </div>
    </div>
  );
}

function Header({ onClose }) {
  return (
    <div className="flex h-16 w-full flex-none items-center gap-4 bg-white px-[5%]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Back"
        className="text-slate-800 hover:text-slate-500"
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
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
      <h1 className="text-base font-bold text-slate-800">Checkout</h1>
    </div>
  );
}
function Address() {
  return (
    <div className="relative flex cursor-pointer gap-1 rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-xs transition-colors hover:bg-slate-200">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="m-0.5 h-5 w-5"
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
      <div className="flex-1">
        <p className="font-bold">lian</p>
        <p className="text-sm text-slate-500">
          Jawa Barat, Majalengka, xxx, xxx
        </p>
      </div>
      <span className="absolute top-3/6 right-0 -translate-y-3/6">
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    </div>
  );
}
function ProductList({ products }) {
  return (
    <ul className="flex w-full scrollbar-none flex-col gap-2 md:flex-1 md:overflow-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}

function ProductCard({ product }) {
  return (
    <li className="w-full rounded-lg border border-slate-300 bg-white px-4 pt-4 shadow-xs">
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
      <div className="mt-4 flex items-center justify-between border-t border-slate-300 py-4">
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

function PaymentMethod({ selectedPayment, onSelectedPayment }) {
  const payment = [
    {
      id: "qris",
      title: "QRIS",
      active: true,
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
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
    },
    {
      id: "transfer",
      title: "Transfer Bank",
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
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      ),
    },

    {
      id: "cod",
      title: "COD (Cash On Delivery)",
      active: false,
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
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      ),
    },
  ];
  return (
    <div className="w-full rounded-lg border border-slate-300 bg-white px-4 pb-3 shadow-xs">
      <h2 className="py-3 text-base font-bold">Payment Method</h2>
      <div className="flex flex-col gap-2">
        {payment.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectedPayment(item.id)}
            className={`flex items-center gap-2 p-2 text-sm ${selectedPayment === item.id ? "bg-slate-200" : ""}`}
          >
            {item.icon}
            <p>{item.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function PaymentDetails({ subtotal }) {
  return (
    <div className="w-full rounded-lg border border-slate-300 bg-white px-4 shadow-xs">
      <h2 className="py-3 text-base font-bold">Payment Details</h2>
      <div className="flex items-center justify-between text-sm">
        <p>Subtotal Pesanan</p>
        <p>Rp{subtotal}</p>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-slate-300 py-2 font-bold">
        <p>Total Payment</p>
        <p>Rp{subtotal}</p>
      </div>
      <div className="hidden pt-2 pb-4 md:block">
        <ButtonOrder />
      </div>
    </div>
  );
}

function CheckoutFooter({ total }) {
  return (
    <div className="flex w-full flex-none flex-col gap-3 border-t border-slate-300 bg-white px-[5%] py-4 md:hidden">
      <div className="flex items-center justify-between font-bold">
        <p>Total</p>
        <p className="text-green-700">Rp{total}</p>
      </div>
      <ButtonOrder />
    </div>
  );
}
function ButtonOrder() {
  return (
    <button
      type="button"
      aria-label="Place an Order"
      className="w-full rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-green-800 active:scale-[0.98]"
    >
      Place an Order
    </button>
  );
}
