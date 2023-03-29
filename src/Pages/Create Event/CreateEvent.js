import React from "react";
import './CreateEvent.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MapPicker from "react-google-map-picker";

function CreateEvent() {
  
    const { user, permission, universityID } = useParams();
    const [rsos, setRsos] = useState([])
    const DefaultLocation = { lat: 28, lng: -81};
    const DefaultZoom = 10;
    const [defaultLocation] = useState(DefaultLocation);
  
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
  
    function handleChangeLocation (lat, lng){
      setLocation({lat:lat, lng:lng});
    }
    
    function handleChangeZoom (newZoom){
      setZoom(newZoom);
    }

    function RSOSelected() {
        if(document.getElementById("event").value === 'rso') {
            document.getElementById("RSO-Selection").hidden = false;
        }
        else {
            document.getElementById("RSO-Selection").hidden = true;
        }
    }

    async function getRSOS(){
      await fetch('http://localhost:8080/api/rso/all', )
      .then(async (Success) => {
          setRsos(await Success.json());
          },
          (failure) => {
              console.error(failure); 
          },
      );
    }

    async function createEvent(event) {
      event.preventDefault();
      
      let eventType = document.getElementById("event").value;
      let startDate = document.getElementById("startDate").value + " " + document.getElementById("startTime").value;
      let endDate = document.getElementById("endDate").value + " " + document.getElementById("endTime").value;
      
      const props = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
              universityID: universityID,
              userID: user,
              category: document.getElementById("category-type").value,
              name: document.getElementById("eventName").value,
              latitude: location.lat,
              longitude: location.lng,
              verified: false,
              eventStart: startDate,
              eventEnd: endDate,
              rsoID: document.getElementById("RSO-Name").value,
              contactPhone: document.getElementById("phone").value,
              email: document.getElementById("email").value,
              description: document.getElementById("rso-description").value
            })
      };
      switch(eventType) {
        case "private":
          await fetch('http://localhost:8080/api/events/private', props)
          .then(async (Success) => {
              let event = await Success.json();
              console.log(event)
              },
              (failure) => {
                  console.error(failure); 
              },
          );
          break;

        case "public":
          await fetch('http://localhost:8080/api/events/public', props)
          .then(async (Success) => {
              let event = await Success.json();
              console.log(event)
              },
              (failure) => {
                  console.error(failure); 
              },
          );
          break;
        
        case "rso":
          await fetch('http://localhost:8080/api/events/rso', props)
          .then(async (Success) => {
              let event = await Success.json();
              console.log(event)
              },
              (failure) => {
                  console.error(failure); 
              },
          );
          break;
        
        default:
      }
  }

    useEffect(() =>{
      if(permission !== "super-admin") {
        document.getElementById("public").style.display = "none";
      }
      if(permission !== "super-admin") {
        document.getElementById("approve-events").style.display = "none";
      }
      getRSOS();
      document.getElementById("form").addEventListener("submit", function(event){createEvent(event)});
    },[])

    return (
       <>
       <div className="topnav">
            <a href={`/home/${user}/${permission}/${universityID}`}>Dashboard</a>
            <a  href={`/join/${user}/${permission}/${universityID}`}>Join RSO</a>
            <a href={`/leave/${user}/${permission}/${universityID}`}>Leave RSO</a>
            <a  href={`/create-rso/${user}/${permission}/${universityID}`}>Create RSO</a>
            <a className="active" href={`/create-event/${user}/${permission}/${universityID}`}>Create Event</a>
            <a href={`/approve-events/${user}/${permission}/${universityID}`} id="approve-events">Approve Events</a>
            <a href="/sign-in">Log Out</a>
        </div>
       <div className="auth-card" style={{marginTop: '325px'}}>
            <div className="auth-content" >
                <form id="form">
                    <h3>Create an Event</h3>
                    <div className="mb-3">
                <label>Name</label>
                <input
                  id="eventName"
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
                <select id="RSO-Name" name="RSO" className="select" >
                            <option value="">-- Select Event Type --</option>
                            {rsos?.res?.map(rso => <option value={rso.rsoID}>{rso.NameRSO}</option>)}
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
                <textarea id="rso-description" className="form-control" placeholder="Description..." rows="3" cols="40" required/>
                
              </div>
              <div className="mb-3">
                <label>Start Time</label>
                <input type="time" className="form-control" id="startTime" min="00:00" max="24:00" placeholder="00:00" required/>

              </div>
              <div className="mb-3">
                <label>Start Date</label><br/>
                <input type="date" className="form-control" id="startDate" min="2023-01-01" max="2025/01/01" required/>
              </div>
              <div className="mb-3">
                <label>End Time</label>
                <input type="time" className="form-control" id="endTime" min="00:00" max="24:00" placeholder="00:00" required/>

              </div>
              <div className="mb-3">
                <label>End Date</label><br/>
                <input type="date" className="form-control" id="endDate" min="2023-01-01" max="2025/01/01" required/>
              </div>
              <div className="mb-3">
                <label>Location</label><br/>
                <MapPicker defaultLocation={defaultLocation}
              zoom={zoom}
              mapTypeId="roadmap"
              style={{height:'250px'}}
              onChangeLocation={handleChangeLocation} 
              onChangeZoom={handleChangeZoom}
              apiKey='AIzaSyDMLJZF8D-0fB-pLqZbt0aFBty80UUAiCY'/>
              </div>
              <div className="mb-3">
                <label>Contact Phone</label><br/>
                <input type="tel" placeholder="555-555-5555" className="form-control" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
              </div>
              <div className="mb-3">
                <label>Contact Email</label>
                <input
                  id="email"
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