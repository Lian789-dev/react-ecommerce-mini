export default function FlexMain() {
  const biodataList = [
    { label: "Username", title: "Lian" },
    { label: "Birth of Date", title: "29-07-2005" },
    { label: "Gender", title: "Male" },
    { label: "Email", title: "ll12345@gmail.com" },
    { label: "Phone Number", title: "085724720023" },
  ];
  return (
    <div className="flex-1 rounded-md border border-slate-300 bg-white shadow-md">
      <div className="flex gap-4 p-4">
        <div className="hidden aspect-square w-64 shrink-0 rounded-md bg-green-600 lg:block"></div>
        <div>
          <h1 className="text-xl font-bold">Biodata</h1>
          <div className="flex flex-col gap-2 pt-4">
            {biodataList.map((item) => (
              <div key={item.label} className="grid grid-cols-2">
                <span>{item.label}</span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
