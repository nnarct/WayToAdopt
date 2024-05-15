import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import AuthService from "@/services/AuthService";
import Layout from "./Layout";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import MyPosts from "@/pages/MyPosts";
// import PetDetailPost from "@/pages/PetDetailsPage";
// import AdoptionSubmission from "@/pages/AdoptionSubmission";
import Post from "@/pages/Post";
import PetDetailsPage from "@/pages/PetDetailsPage";

import ContentCard from "@/components/shared/ContentCard";
import Page404 from "@/components/shared/Page404";

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<Layout />}>
              <Route path="/*" element={<Page404 />} />
              <Route index element={<HomePage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/editpf" element={<ProfilePage />} />
                <Route path="/myposts" element={<MyPosts />} />
                <Route path="/myposts/pdetail" element={<Post />} />
                <Route
                  path="/petdetails/:postID"
                  element={<PetDetailsPage />}
                />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </>
  );
};

// Guard routes for authenticated users
const PrivateRoute = () => {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? (
    <ContentCard>
      <Outlet />
    </ContentCard>
  ) : (
    <Navigate to="/" replace />
  );
};

export default App;
