export default function ProductTabsAction({ activeTab, onActiveTab }) {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: "Reviews" },
    { id: "specification", label: "Specification" },
  ];
  return (
    <div className="flex scrollbar-none gap-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onActiveTab(tab.id)}
          className={`px-4 py-2.5 font-semibold text-slate-800 ${
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
