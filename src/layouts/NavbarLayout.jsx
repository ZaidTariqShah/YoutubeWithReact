import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const NavbarLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default NavbarLayout;
