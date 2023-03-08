import React from "react";
import './SignUp.css';

function SignUp() {
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
                <button type="submit" className="btn btn-primary">
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