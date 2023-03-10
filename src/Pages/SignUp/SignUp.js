import React from "react";
import { useNavigate } from "react-router-dom";

import './SignUp.css';
function SignUp() {
    const navigate = useNavigate();
    async function CreateUser() {
        const sampleUser = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: "2",
                email: "sampleUser2@gmail.com",
                password: "12345",
                permsion:"student",
                salt: "12345",
                universityID: 1
              })
        };

        await fetch('http://localhost:8080/api/user', sampleUser)
        .then((Success) => {
            console.log(Success);
            navigate('/sign-in')
          },
          (failure) => {
            console.error(failure); 
          },
        );
    }

    return (
        <div className="auth-card">
          <div className="auth-content">
          <form>
                <h3>Sign Up</h3>
                <div className="mb-3">
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                />
                </div>
                <div className="mb-3">
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name" />
                </div>
                <div className="mb-3">
                <label>Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                />
                </div>
                <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                />
                </div>
                <div className="mb-3">
                <label>Account Type</label><br/>
                    <input type="radio" id="student" name="account" value="Student"/>
                    <label for="student">Student</label><br/>
                    <input type="radio" id="admin" name="account" value="admin"/>
                    <label for="admin">Admin</label><br/>
                    <input type="radio" id="super-admin" name="account" value="super-admin"/>
                    <label for="super-admin">Super Admin</label>
                </div>
                <div className="d-grid">
                <button type="button" className="btn btn-primary" onClick={CreateUser}>
                    Sign Up
                </button>
                </div>
                <p className="forgot-password text-center">
                    Already Registered <a href="/sign-in">Sign In?</a>
                </p>
            </form>
          </div>
        </div>
    )
}

export default SignUp;