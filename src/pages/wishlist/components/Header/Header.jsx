import ButtonBack from "./ButtonBack";

export default function Header() {
  return (
    <div className="sticky top-0 left-0 z-40 w-full border-b border-slate-300 bg-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <ButtonBack />
        <h1 className="text-base font-bold text-slate-800">Wishlist</h1>
      </div>
    </div>
  );
}
