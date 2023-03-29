import React from "react";
import './Join.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Join() {
    const { user, permission, universityID } = useParams();
    const [rsos, setRsos] = useState(null);

    async function getRSOS() {
        const props = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              universityID: universityID
              })
        };
        await fetch('http://localhost:8080/api/rso/university', props)
        .then(async (Success) => {
            setRsos(await Success.json());
            },
            (failure) => {
                console.error(failure); 
            },
        );
      }

      async function joinRSO(event) {
        event.preventDefault();
        document.getElementById("message").style.display = "none";
        
        const props = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              rsoID: document.getElementById("rso-select").value,
              userID: user
              })
        };
        await fetch('http://localhost:8080/api/rso/addUser', props)
        .then(async (Success) => {
            console.log(await Success.json());
            document.getElementById("message").style.display = "";
            document.getElementById("message").innerText = "Rso Joined!"
            getRSOS();
            },
            (failure) => {
                console.error(failure); 
            },
        );
      }

      useEffect(()=> {
        getRSOS();
        document.getElementById("form").addEventListener("submit", function(event){joinRSO(event)});
        if(permission === "student") {
           document.getElementById("event").style.display = "none"; 
        }
         
        if(permission !== "super-admin") {
            document.getElementById("approve-events").style.display = "none";
        }
    },[]);
    
    return (
       <>
       <div className="topnav">
            <a href={`/home/${user}/${permission}/${universityID}`}>Dashboard</a>
            <a  className="active" href={`/join/${user}/${permission}/${universityID}`}>Join RSO</a>
            <a href={`/leave/${user}/${permission}/${universityID}`}>Leave RSO</a>
            <a  href={`/create-rso/${user}/${permission}/${universityID}`}>Create RSO</a>
            <a href={`/create-event/${user}/${permission}/${universityID}`} id="event">Create Event</a>
            <a href={`/approve-events/${user}/${permission}/${universityID}`} id="approve-events">Approve Events</a>
            <a href="/sign-in">Log Out</a>
        </div>
       <div className="auth-card">
            <div className="auth-content" style={{marginBottom: '285px'}}>
                <form id="form">
                    <h3>Join an RSO</h3>
                    <div className="mb-3">
                        <label>RSO:</label><br />
                        <select name="RSO" id="rso-select" className="select" required>
                            <option value="">-- Select RSO --</option>
                            {rsos?.res?.map(rso => <option value={rso.rsoID}>{rso.NameRSO}</option>)}
                        </select>
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Join
                        </button>
                    </div>
                    <span id="message"></span>
                </form>
            </div>
        </div>
        </>
    )
}

export default Join;