import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MapPicker from 'react-google-map-picker'

function SuperAdminSignUp() {
  const navigate = useNavigate();
  const { user } = useParams();
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

  async function AttachUniversity(User, universityID) {
    const props = {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            userID: User.userID,
            email: User.email,
            password: User.password,
            permsion: User.permssion,
            salt: User.salt,
            universityID: universityID.id
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

  async function getUser(universityID) {
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
        console.log(User[0])
        AttachUniversity(User[0], universityID)
        },
        (failure) => {
            console.error(failure); 
        },
    );
}

  async function CreateUniversity(event){
    event.preventDefault();
    console.log("called");

    const props = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        nameUniversity: document.getElementById("universityName").value,
        latitude: location.lat,
        longitude: location.lng,
        emailDomain: document.getElementById("universityDomain").value,
          })
    };

    await fetch('http://localhost:8080/api/university', props)
    .then(async (Success) => {
        let university = await Success.json();
        //console.log(university.id);
        getUser(university);
        },
        (failure) => {
            console.error(failure); 
        },
    );
  }

  useEffect(()=>{
    document.getElementById("form").addEventListener("submit", function(event){CreateUniversity(event)});
  },[]);


  return (
    <>
    <div className="auth-card" style={{marginTop: '15px'}}>
          <div className="auth-content" >
              <form id="form">
                  <h3>Create a University</h3>
            <div className="mb-3">
              <label>Name</label>
              <input
                id="universityName"
                type="name"
                className="form-control"
                placeholder="University Name"
                required
              />
            </div>
            <div className="mb-3">
              <label>Email Domain</label>
              <input
              id="universityDomain"
                type="name"
                className="form-control"
                placeholder="Email Domain"
                required
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea id="university-description" className="form-control" placeholder="Description..." rows="3" cols="40" required/>
              
            </div>
            <div className="mb-3">
              <label>Number of Students</label>
              <input
              id="universityPopulation"
                type="name"
                className="form-control"
                placeholder="Students"
                required
              />
            </div>
            {/* <div className="mb-3">
            <label>University Photo</label>
            <input id="universityPhoto"  type="file" class="form-control" name="universityPhoto"/>
            </div> */}
              <div className="mb-3">
              <label>Location</label><br></br>
            <MapPicker defaultLocation={defaultLocation}
              zoom={zoom}
              mapTypeId="roadmap"
              style={{height:'250px'}}
              onChangeLocation={handleChangeLocation} 
              onChangeZoom={handleChangeZoom}
              apiKey='AIzaSyDMLJZF8D-0fB-pLqZbt0aFBty80UUAiCY'/>
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

export default SuperAdminSignUp;