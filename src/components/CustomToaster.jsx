import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  const [position, setPosition] = useState("top-center");

  useEffect(() => {
    const updatePosition = () => {
      if (window.innerWidth < 640) {
        setPosition("top-center");
      } else {
        setPosition("bottom-right");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Toaster
      position={position}
      reverseOrder={false}
      containerStyle={{
        zIndex: 9999,
        // Mobile: pas di bawah navbar (top 70px)
        ...(position === "top-center" && { top: 70 }),
        // Desktop: seluruh wadah naik 66px dari bawah (jarak antartoast tetap rapat)
        ...(position === "bottom-right" && { bottom: 66 }),
      }}
      toastOptions={{
        duration: 3000,
        className: "text-sm font-medium rounded-xl shadow-md px-4 py-3 border",
        success: {
          className:
            "bg-green-50 text-green-800 border-green-200 text-sm font-medium rounded-xl shadow-md px-4 py-3",
          iconTheme: {
            primary: "#15803d",
            secondary: "#ffffff",
          },
        },
        error: {
          className:
            "bg-red-50 text-red-800 border-red-200 text-sm font-medium rounded-xl shadow-md px-4 py-3",
          iconTheme: {
            primary: "#dc2626",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
