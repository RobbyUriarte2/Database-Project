import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import './SignUp.css';
function SignUp() {
    const navigate = useNavigate();

    async function CreateUser(event) {
        event.preventDefault();

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
            //console.log(await Success.json());
            let User = await Success.json();
            switch(type) {
                case "student": 
                    navigate(`/student/${User.id}`,)
                    break;
                case "admin":
                    navigate('/admin')
                    break;
                case "super-admin":
                navigate('/super-admin')
                break;

                default: 
            }   
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    useEffect(()=>{
        document.getElementById("form").addEventListener("submit", function(event){CreateUser(event)});
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
                    <input type="radio" id="admin" name="account" value="admin"/>
                    <label for="admin">Admin</label><br/>
                    <input type="radio" id="super-admin" name="account" value="super-admin" required/>
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