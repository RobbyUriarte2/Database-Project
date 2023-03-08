import React from "react";
import './Login.css'

function Login() {
    return (
        <div className="auth-card">
          <div className="auth-content">
            <form action="/home">
              <h3>Sign In</h3>
              <div className="mb-3">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                />
                <p className="forgot-password text-right">
                  <a href="forgot-password">Forgot Password?</a>
                </p>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
              <p className="forgot-password text-center">
                Don't have an account? <a href="/sign-up">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
    )
}

export default Login;