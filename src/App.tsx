import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateDiscussionPage from "./pages/CreateDiscussionPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfile";
import BottomNavigation from "./components/BottomNavigation";
import ListDiscussionPage from "./pages/ListDiscussionPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const { authUser = null, isPreload = false } = useSelector(
    (states) => states,
  );

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) return null;

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main className="flex justify-center">
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }
  /*
   * jika berada di / maka posisi halamnya di bawah ini.
   * maka jika tombol logout di tekan halaman akan kososng karena tidak mtach
   * dengan nilai Route di bawah
   */
  return (
    <>
      <Loading />
      <div
        className="flex justify-center"
        style={{ background: "linear-gradient(45deg, #3498db, #e74c3c)" }}
      >
        <div className="w-screen md:w-full lg:max-w-[50%]">
          <Routes>
            <Route path="/" element={<ListDiscussionPage />} />
            <Route path="/me" element={<UserProfilePage />} />
            <Route path="/create" element={<CreateDiscussionPage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
          </Routes>
          <BottomNavigation />
        </div>
      </div>
    </>
  );
}

export default App;
