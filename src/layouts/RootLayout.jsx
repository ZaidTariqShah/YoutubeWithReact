import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Outlet />
    </>
  );
};

export default RootLayout;
