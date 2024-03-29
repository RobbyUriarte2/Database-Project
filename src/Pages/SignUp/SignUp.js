import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import './SignUp.css';
function SignUp() {
    const navigate = useNavigate();

    async function CreateUser(event) {
        event.preventDefault();
        document.getElementById("errorMessage").style.display = "none";

        var type;
        var types = document.getElementsByName('account');
        for(let i = 0; i < types.length; i++) {
            if(types[i].checked)
            type = types[i].value;
        }

        console.log(type);
        
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: null,
                email: document.getElementById("userEmail").value,
                password: document.getElementById("userPassword").value,
                permsion: type,
                salt: "12345",
                universityID: 1
                })
        };

        await fetch('http://localhost:8080/api/user', props)
        .then(async (Success) => {
            let User = await Success.json();
            if(User.id != null) {
                switch(type) {
                    case "student": 
                        navigate(`/student/${User.id}`)
                        break;
                    case "super-admin":
                    navigate(`/super-admin/${User.id}`)
                    break;
    
                    default: 
                } 
            } else {
                document.getElementById("errorMessage").style.display = "";
                document.getElementById("errorMessage").innerText = "Email Already in Use";
            }
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    useEffect(()=>{
        document.getElementById("form").addEventListener("submit", function(event){CreateUser(event)});
        document.getElementById("errorMessage").style.display = "none";
    });
    
    return (
        <div className="auth-card">
          <div className="auth-content">
          <form id="form">
                <h3>Sign Up</h3>
                <div className="mb-3">
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    required
                />
                </div>
                <div className="mb-3">
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name" />
                </div>
                <div className="mb-3">
                <label>Email Address</label>
                <input
                    id="userEmail"
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    required
                />
                </div>
                <div className="mb-3">
                <label>Password</label>
                <input
                    id="userPassword"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                />
                </div>
                <div className="mb-3">
                <label>Account Type</label><br/>
                    <input type="radio" id="studen" name="account" value="student" />
                    <label for="student">Student</label><br/>
                    <input type="radio" id="super-admin" name="account" value="super-admin" required/>
                    <label for="super-admin">Super Admin</label>
                </div>
                <div className="d-grid">
                    <span id="errorMessage" className="errorMessage"></span>
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