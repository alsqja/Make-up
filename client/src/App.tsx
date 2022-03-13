import React from 'react';
import './App.css';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { Main } from './Pages/Main';
import { Header } from './Components/Header';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>}/>
      </Routes>
    </Router>
  );
}

export default App;
