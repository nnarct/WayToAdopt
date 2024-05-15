import { Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import UserNavbar from "@/components/UserNavbar";
import AnonymousNavbar from "@/components/AnonymousNavbar";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <AnonymousNavbar />}
      <main className="container px-4 mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
