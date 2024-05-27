import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import Layout from "./Layout";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import SignupPage from "@/pages/SignupPage";
import PetDetailsPage from "@/pages/PetDetailsPage";
import ProfilePage from "@/pages/ProfilePage";
import MyPosts from "@/pages/MyPosts";
// import PetDetailPost from "@/pages/PetDetailsPage";
// import AdoptionSubmission from "@/pages/AdoptionSubmission";
import Post from "@/pages/Post";
import PostAnswersPage from "@/pages/PostAnswersPage";
import ContentCard from "@/components/shared/ContentCard";
import Page404 from "@/components/shared/Page404";
import SubmitSuccess from "@/pages/SubmitSuccess";
import { useAuth } from "@/contexts/AuthContext";

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
          

            {/* <Route path="/petdetails/:postID" element={<PostIDforDetailTest />} /> */}
            {/* <Route path="/petdetails" element={<PostDetail />} /> */}
            <Route element={<Layout />}>
              <Route path="/*" element={<Page404 />} />
              <Route index element={<HomePage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/editpf" element={<ProfilePage />} />
                <Route path="/myposts" element={<MyPosts />} />
                <Route path="/myposts/pdetail/:postID" element={<Post />} />
                <Route
                  path="/myposts/pdetail/answerslist/:postID"
                  element={<PostAnswersPage />}
                />
                <Route
                  path="/petdetails/:postID"
                  element={<PetDetailsPage />}
                />
                <Route
                  path="/submitSuccess"
                  element={<SubmitSuccess />}
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
  const { token } = useAuth();

  return token ? (
    <ContentCard>
      <Outlet />
    </ContentCard>
  ) : (
    <Navigate to="/" replace />
  );
};

export default App;
