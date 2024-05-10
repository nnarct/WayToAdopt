import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container px-4 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
