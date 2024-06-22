import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Questions from "./pages/questions/Questions";
import AskQuestion from "./pages/askQuestion/AskQuestion";
import RequiresAuth from "./components/requiresAuth/RequiresAuth";
import DisplayQuestions from "./pages/questions/DisplayQuestions";
import Tags from "./pages/tags/Tags";
import Users from "./pages/users/Users";
import UserProfile from "./pages/users/UserProfile";
import SimilarQuestions from './pages/questions/SimilarQuestions';

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Questions" element={<Questions />} />
      <Route
        path="/AskQuestion"
        element={
          <RequiresAuth>
            <AskQuestion />
          </RequiresAuth>
        }
      />
      <Route path="/Questions/:id" element={<DisplayQuestions />} />
      <Route path="/Tags" element={<Tags />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Users/:id" element={<UserProfile />} />
      <Route path="/similar-questions/:id" component={SimilarQuestions} />
    </Routes>
  );
}

export default AllRoutes;
