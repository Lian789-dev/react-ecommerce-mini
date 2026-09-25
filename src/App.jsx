import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import CustomToaster from "./components/CustomToaster";
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CustomToaster />
    </>
  );
}
