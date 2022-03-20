import React, { useState } from "react";
import "./App.css";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { Main } from "./Pages/Main";
import { Header } from "./Components/Header";
import { Post } from "./Pages/Post";
import { Mypage } from "./Pages/Mypage";
import CreatePost from "./Pages/CreatePost";
import { RecoilRoot } from 'recoil';
import { InputFile } from "./Pages/InputFile";
import { Result } from "./Pages/Result";

function App() {
  const [isLoginModalOn, setIsLoginModalOn] = useState(false);
  const [isSignupModalOn, setIsSignupModalOn] = useState(false);

  const loginModalHandler = (modalState: number) => {
    if (modalState === 0) {
      setIsLoginModalOn(true);
    } else {
      setIsLoginModalOn(false);
    }
  };

  const signupModalHandler = (modalState: number) => {
    if (modalState === 0) {
      setIsSignupModalOn(true);
    } else {
      setIsSignupModalOn(false);
    }
  };

  return (
    <Router>
      <RecoilRoot>
        <Header
          isLoginModalOn={isLoginModalOn}
          loginModalHandler={loginModalHandler}
          isSignupModalOn={isSignupModalOn}
          signupModalHandler={signupModalHandler}
        />
        <Routes>
          <Route path="/*" element={<Main />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/mypage/:id" element={<Mypage />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/makeup" element={<InputFile />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
