import { Outlet } from "react-router-dom";
import { useModalStore } from "../store/useModalStore";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import MobileSearchModal from "../components/MobileSearchModal";
export default function RootLayout() {
  const activeModal = useModalStore((state) => state.activeModal);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {activeModal === "cart-drawer" && <CartDrawer />}
      {activeModal === "mobile-search" && <MobileSearchModal />}
    </>
  );
}
