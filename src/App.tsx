import { Routes, Route } from "react-router-dom";
import CreateThreadPage from "./pages/CreateThreadPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfile";
import BottomNavigation from "./components/BottomNavigation";
import HomePage from "./pages/HomePage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { useSelector } from "react-redux";
import DetailThreadPage from "./pages/DetailThreadPage";
import { Toaster } from "react-hot-toast";
import { asyncUnsetAuthUser } from "./states/authUser/action";

function App() {
  const dispatch = useDispatch();
  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) return null;

  if (authUser === null) {
    return (
      <>
        <Loading />
        <Toaster position="top-right" reverseOrder={false} />
        <div
          className="h-screen flex justify-center"
          // style={{ background: "linear-gradient(45deg, #3498db, #e74c3c)" }}
        >
          <div className="md:w-full sm:w-full">
            <Routes className="">
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Loading />
      <Toaster />
      <div
        className="flex justify-center "
        // style={{ background: "linear-gradient(45deg, #3498db, #e74c3c)" }}
      >
        <div className="md:w-full sm:w-full lg:max-w-[50%]">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/me" element={<UserProfilePage />} />
              <Route path="/create" element={<CreateThreadPage />} />
              <Route path="/leaderboard" element={<LeaderBoardPage />} />
              <Route path="/threads/:threadId" element={<DetailThreadPage />} />
            </Routes>
            <BottomNavigation onLogout={onLogout} />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
