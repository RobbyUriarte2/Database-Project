import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import HomePage from "./Pages/HomePage/HomePage";
import Join from "./Pages/Join/Join";
import RSO from "./Pages/Create RSO/RSO";
import CreateEvent from "./Pages/Create Event/CreateEvent";
import StudentSignUp from "./Pages/StudentSignUp/StudentSignUp";
import SuperAdminSignUp from "./Pages/SuperAdminSignUp/SuperAdminSignUp";
import Leave from "./Pages/Leave/Leave";
import ApproveEvents from "./Pages/Approve Events/ApproveEvents";
import ViewEvent from "./Pages/ViewEvent/ViewEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home/:user/:permission/:universityID" element={<HomePage />} />
        <Route path="/join/:user/:permission/:universityID" element={<Join />} />
        <Route path="/leave/:user/:permission/:universityID" element={<Leave />} />
        <Route path="/create-rso/:user/:permission/:universityID" element={<RSO />} />
        <Route path="/create-event/:user/:permission/:universityID" element={<CreateEvent />} />
        <Route path="/student/:user" element={<StudentSignUp />} />
        <Route path="/super-admin/:user" element={<SuperAdminSignUp />} />
        <Route path="/approve-events/:user/:permission/:universityID" element={<ApproveEvents />} />
        <Route path="/view-event/:user/:permission/:universityID/:eventID" element={<ViewEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
