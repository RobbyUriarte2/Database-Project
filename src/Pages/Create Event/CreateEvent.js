import React from "react";
import './CreateEvent.css';
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function CreateEvent() {
  
    const { user, permission } = useParams();

    function RSOSelected() {
        if(document.getElementById("event").value === 'rso') {
            document.getElementById("RSO-Selection").hidden = false;
        }
        else {
            document.getElementById("RSO-Selection").hidden = true;
        }
    }

    useEffect(() =>{
      if(permission !== "super-admin") {
        document.getElementById("public").style.display = "none";
      }
    })
    return (
       <>
       <div className="topnav">
            <a href={`/home/${user}/${permission}`}>Dashboard</a>
            <a  href={`/join/${user}/${permission}`}>Join RSO</a>
            <a  href={`/create-rso/${user}/${permission}`}>Create RSO</a>
            <a className="active" href={`/create-event/${user}/${permission}`}>Create Event</a>
            <a href="/sign-in">Log Out</a>
        </div>
       <div className="auth-card" style={{marginTop: '150px'}}>
            <div className="auth-content" >
                <form>
                    <h3>Create an Event</h3>
                    <div className="mb-3">
                <label>Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Event Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Type</label>
                <select id="event" className="select" onChange={RSOSelected} required>
                            <option value="">-- Select Event Type --</option>
                            <option value="private">Private</option>
                            <option value="public" id="public">Public</option>
                            <option value="rso">RSO</option>
                        </select>
              </div>
              <div className="mb-3" id="RSO-Selection" hidden >
                <label>RSO</label>
                <select name="RSO" className="select" >
                            <option value="">-- Select Event Type --</option>
                            <option value="random">Random RSO</option>
                        </select>
              </div>
              <div className="mb-3">
                <label>Category</label>
                <select name="RSO" id="category-type" className="select" required>
                            <option value="">-- Select Event Category --</option>
                            <option value="social">Social</option>
                            <option value="fundraising">Fundraising</option>
                            <option value="tech-talk">Tech Talk</option>
                            <option value="sports">Sports</option>
                            <option value="competition">competition</option>
                        </select>
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea id="ros-description" className="form-control" placeholder="Description..." rows="3" cols="40" required/>
                
              </div>
              <div className="mb-3">
                <label>Time</label>
                <input type="time" className="form-control" id="time" min="00:00" max="24:00" placeholder="00:00" required/>

              </div>
              <div className="mb-3">
                <label>Date</label><br/>
                <input type="date" className="form-control" id="start"min="2023-01-01" max="2025/01/01" required/>
              </div>
              <div className="mb-3">
                <label>Location</label><br/>
                <input type="name" className="form-control" required/>
              </div>
              <div className="mb-3">
                <label>Contact Phone</label><br/>
                <input type="tel" placeholder="555-555-5555" className="form-control" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
              </div>
              <div className="mb-3">
                <label>Contact Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateEvent;