import { useState } from "react";
import CreateDiscussionPage from "./CreateDiscussionPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import BottomNavigation from "../components/BottomNavigation";
import ListDiscussionPage from "./ListDiscussionPage";
import LeaderBoardPage from "./LeaderBoardPage";


const HomePage = (props) => {
  const isLoginOrRegister =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListDiscussionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateDiscussionPage />} />
          <Route path="/leaderboard" element={<LeaderBoardPage />} />
        </Routes>
        {!isLoginOrRegister && <BottomNavigation />}
      </BrowserRouter>
    </>
  );
};

export default HomePage;
