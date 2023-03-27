import React, { useState } from "react";
import './StudentSignUp.css'
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StudentSignUp() {
    const [universities, setUniversities] = useState([]);
    const { user } = useParams();
    const navigate = useNavigate();

    async function getUniversities(){
        await fetch('http://localhost:8080/api/university/getall')
            .then(async (Success) => {
                setUniversities(await Success.json());
                },
                (failure) => {
                    console.error(failure); 
                },
            );
    }
    
    useEffect(()=> {
        getUniversities();
    },[]);

    async function AttachUniversity(User) {
        let id = document.getElementById("university-select").value;
        const props = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: User.userID,
                email: User.email,
                password: User.password,
                permsion: User.permssion,
                salt: User.salt,
                universityID: id
            })
        };
        await fetch('http://localhost:8080/api/user/update', props)
        .then(async (Success) => {
            console.log(Success);
            navigate('/sign-in')
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    async function getUser(event) {
        event.preventDefault();
        console.log(document.getElementById("university-select").value)
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: user,
                })
        };
        await fetch('http://localhost:8080/api/user/get', props)
        .then(async (Success) => {
            let User = await Success.json();
            AttachUniversity(User[0])
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }
    
        useEffect(()=>{
            document.getElementById("form").addEventListener("submit", function(event){getUser(event)});
        },[]);

    return (
      <div className="auth-card">
            <div className="auth-content" style={{marginBottom: '285px'}}>
                <form id="form">
                    <h3>Select Your Univeristy</h3>
                    <div className="mb-3">
                        <label>University:</label><br />
                        
                        <select name="select" id="university-select" className="select">
                        <option value="">-- Select University--</option>
                        {universities.map(uni => <option value={uni.universityID}>{uni.nameUniversity}</option>)}
                        </select>

                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default StudentSignUp;