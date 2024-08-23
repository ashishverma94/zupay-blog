import {
  Layout,
  HomePage,
  LoginPage,
  SignupPage,
  AddAndEditBlog,
  BlogDetailsPage,
} from "./pages";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/blog/:id"
              element={<ProtectedRoute element={<BlogDetailsPage />} />}
            />
            <Route
              path="/add-blog"
              element={<ProtectedRoute element={<AddAndEditBlog />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
