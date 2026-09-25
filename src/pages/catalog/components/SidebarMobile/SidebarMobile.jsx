import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import FlexAside from "../FlexAside";
export default function SidebarMobile() {
  const onCloseModal = useModalStore((state) => state.onCloseModal);
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  return (
    <aside className="fixed top-16 left-0 flex h-full w-full">
      <div className="h-full w-64 flex-none border border-slate-300 bg-white px-4 sm:px-6">
        <FlexAside />
      </div>
      <div
        onClick={onCloseModal}
        className="h-full w-full flex-1 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      ></div>
    </aside>
  );
}
