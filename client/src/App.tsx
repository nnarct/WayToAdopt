import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  Outlet,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import OwnerDashboard from "@/pages/OwnerDashboard";
import PetDetailPost from "@/pages/PetDetailPost";
import AdoptionSubmission from "@/pages/AdoptionSubmission";
import AuthService from "@/services/AuthService";
import Layout from "./Layout";

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3C6685",
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="*" element={<Navigate to={"/"} />} />
            <Route element={<UserWrapper />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route element={<PrivateWrapper />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/owner-dashboard" element={<OwnerDashboard />} />
                <Route path="/pet-details/:postId" element={<PetDetailPost />} />
                {/* <Route path="/pet-post" element={<PetDetailPost />} /> */}
                <Route
                  path="/adoption-submission"
                  element={<AdoptionSubmission />}
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </>
  );
};

const PrivateWrapper = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  console.log({ isAuthenticated });
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
const UserWrapper = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  console.log({ isAuthenticated });
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default App;
