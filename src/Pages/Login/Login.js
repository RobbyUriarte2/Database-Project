import React from "react";
import './Login.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  async function logUserIn(event){
    event.preventDefault();

    document.getElementById("error").style.display = "none";
    document.getElementById("errorEmail").style.display = "none";

    const props = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          email: document.getElementById("userEmail").value,
          password: document.getElementById("userPassword").value
        })
    };
    
    await fetch('http://localhost:8080/api/user/login', props)
    .then(async (Success) => {
        let result = await Success.json();
        console.log(result);
        if(Object.keys(result).length === 0){
          document.getElementById("errorEmail").style.display = "";
        }      
        else if(result.user.password !== document.getElementById("userPassword").value){
          document.getElementById("error").style.display = "";
        }
        else {
          navigate(`/home/${result.user.userID}/${result.user.permission}/${result.user.universityID}`)
          console.log(result.user.permission);
          console.log("login success");
        }
        },
        (failure) => {
            console.error(failure); 
        },
    );
  }
  
  useEffect(()=>{
    document.getElementById("form").addEventListener("submit", function(event){logUserIn(event)});
    document.getElementById("error").style.display = "none";
    document.getElementById("errorEmail").style.display = "none";
  });

    return (
        <div className="auth-card">
          <div className="auth-content">
            <form id="form">
              <h3>Sign In</h3>
              <div className="mb-3">
                <label>Email Address</label>
                <input
                  id="userEmail"
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
                <span id="errorEmail" className="errorMessage">Incorrect Email</span>
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  id="userPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  required
                />
                <span id="error" className="errorMessage">Incorrect Password</span>
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