import ButtonBack from "./ButtonBack";
import NavList from "./NavList";

export default function Header() {
  return (
    <div className="sticky top-0 left-0 z-40 w-full border-b border-slate-300 bg-white">
      <div className="flex h-16 w-full items-center gap-4 px-4">
        <ButtonBack />
        <h3 className="text-base font-bold text-slate-800">Order History</h3>
      </div>
      <NavList />
    </div>
  );
}
