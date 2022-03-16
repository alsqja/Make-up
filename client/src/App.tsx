import React, { useState } from 'react';
import './App.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { Main } from './Pages/Main';
import { Header } from './Components/Header';
import { Post } from './Pages/Post';
import { Mypage } from './Pages/Mypage';
import { RecoilRoot } from 'recoil';

function App() {

  const [isLoginModalOn, setIsLoginModalOn] = useState(false)
  const [isSignupModalOn, setIsSignupModalOn] = useState(false)

  const loginModalHandler = (modalState: number) => {
    if(modalState === 0) {
      setIsLoginModalOn(true)
    }
    else {
      setIsLoginModalOn(false)
    }
  }

  const signupModalHandler = (modalState: number) => {
    if(modalState === 0) {
      setIsSignupModalOn(true)
    }
    else {
      setIsSignupModalOn(false)
    }
  }

  return (
    <Router>
      <RecoilRoot>
        <Header isLoginModalOn={isLoginModalOn} loginModalHandler={loginModalHandler} isSignupModalOn={isSignupModalOn} signupModalHandler={signupModalHandler}/>
        <Routes>
          <Route path='/*' element={<Main/>}/>
          <Route path='/post/:id' element={<Post/>}/>
          <Route path='/mypage/:id' element={<Mypage/>}/>
        </Routes>
      </RecoilRoot>
    </Router>
  );
}

export default App;
