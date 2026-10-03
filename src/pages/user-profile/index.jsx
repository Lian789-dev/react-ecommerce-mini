import BottomNavigation from "@/components/BottomNavigation";
import Header from "./components/Header";
import NavigationList from "./components/NavigationList";
import FlexAside from "./components/FlexAside";
import FlexMain from "./components/FlexMain";
export default function UserProfile() {
  return (
    <div className="w-full bg-slate-100">
      <div className="mx-auto min-h-[calc(100dvh-130px)] w-full max-w-7xl pt-4 md:min-h-[calc(100dvh-65px)]">
        <div className="hidden items-start gap-4 px-6 md:flex lg:px-8">
          <FlexAside />
          <FlexMain />
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <div className="border-y border-slate-300 bg-white p-4 shadow-md sm:px-6">
            <Header />
          </div>
          <div className="border-y border-slate-300 bg-white py-4 shadow-md">
            <NavigationList />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
