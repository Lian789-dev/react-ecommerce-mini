import { useState } from "react";
import ProductTabsAction from "./ProductTabsAction";
import ProductTabsContent from "./ProductTabsContent";
export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <div className="mt-5 border-y border-slate-300 bg-white pb-6 shadow-md sm:rounded-md sm:border">
      <ProductTabsAction activeTab={activeTab} onActiveTab={setActiveTab} />
      <ProductTabsContent activeTab={activeTab} />
    </div>
  );
}
