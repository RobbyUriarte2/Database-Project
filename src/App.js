import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import HomePage from "./Pages/HomePage/HomePage";
import Join from "./Pages/Join/Join";
import RSO from "./Pages/Create RSO/RSO";
import CreateEvent from "./Pages/Create Event/CreateEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/create-rso" element={<RSO />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
