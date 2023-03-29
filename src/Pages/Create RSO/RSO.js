import React from "react";
import './RSO.css';
import { Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function RSO() {
  const { user, permission, universityID } = useParams();

  async function createRSO(event) {
    event.preventDefault();
    document.getElementById("message").style.display = "none";
    const props = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          rsoID: null,
          userID: user,
          NameRSO: document.getElementById("name").value,
          DescriptionRSO: document.getElementById("rso-description").value,
          universityID: universityID
          })
    };
    await fetch('http://localhost:8080/api/rso', props)
    .then(async (Success) => {
        let rso = await Success.json();
        console.log(rso);
        document.getElementById("message").style.display = "";
        document.getElementById("message").innerText = "Rso Added!"

        },
        (failure) => {
            console.error(failure); 
        },
    );
  }

  useEffect(()=>{
    document.getElementById("form").addEventListener("submit", function(event){createRSO(event)});
    document.getElementById("message").style.display = "none";
    if(permission === "student") {
      document.getElementById("event").style.display = "none";
    }
    if(permission !== "super-admin") {
      document.getElementById("approve-events").style.display = "none";
    }
  },[]);  

    return (
       <>
       <div class="topnav">
       <a href={`/home/${user}/${permission}/${universityID}`}>Dashboard</a>
            <a  href={`/join/${user}/${permission}/${universityID}`}>Join RSO</a>
            <a href={`/leave/${user}/${permission}/${universityID}`}>Leave RSO</a>
            <a className="active" href={`/create-rso/${user}/${permission}/${universityID}`}>Create RSO</a>
            <a href={`/create-event/${user}/${permission}/${universityID}`} id="event">Create Event</a>
            <a href={`/approve-events/${user}/${permission}/${universityID}`} id="approve-events">Approve Events</a>
            <a href="/sign-in">Log Out</a>
        </div>
       <div className="auth-card">
            <div className="auth-content">
                <form id="form">
                    <h3>Create an RSO</h3>
                    <div className="mb-3">
                <label>Name</label>
                <input
                  id="name"
                  type="name"
                  className="form-control"
                  placeholder="Enter RSO Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea id="rso-description" className="form-control" placeholder="Description..." rows="3" cols="40" required/>
              </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div>
                    <span id="message"></span>
                </form>
            </div>
        </div>
        </>
    )
}

export default RSO;