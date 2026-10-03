import Header from "../Header";
import NavigationList from "../NavigationList";

export default function FlexAside() {
  return (
    <div className="w-80 flex-none rounded-md border border-slate-200 bg-white shadow-md">
      <div className="border-b border-slate-300 p-4">
        <Header />
      </div>
      <div className="pt-2 pb-20">
        <NavigationList />
      </div>
    </div>
  );
}
