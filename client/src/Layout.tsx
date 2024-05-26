import { Outlet } from "react-router-dom";

import UserNavbar from "@/components/UserNavbar";
import AnonymousNavbar from "@/components/AnonymousNavbar";
import { useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";

const Layout = () => {
  const { token } = useAuth();

  return (
    <>
      {token ? <UserNavbar /> : <AnonymousNavbar />}
      <main className="container px-4 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
