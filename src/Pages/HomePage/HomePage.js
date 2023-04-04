import { useEffect, useState} from "react";
import './HomePage.css';
import { Card, ListGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { Timeline } from 'react-twitter-widgets'

function HomePage() {
    const navigate = useNavigate();
    const { user, permission, universityID } = useParams();


    const [publicEvents, setPublicEvents] = useState([]);
    const [privateEvents, setPrivateEvents] = useState([]);
    const [rsoEvents, setRsoEvents] = useState([]);

    async function getPublicEvents() {
        await fetch('http://localhost:8080/api/events/allPublic')
        .then(async (Success) => {
            let publicEvents = await Success.json();
            console.log(publicEvents);
            setPublicEvents(publicEvents);
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    async function getPrivateEvents() {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                universityID: universityID,
                })
        };
        await fetch('http://localhost:8080/api/events/allPrivate', props)
        .then(async (Success) => {
            let privateEvents = await Success.json();
            console.log(privateEvents);
            setPrivateEvents(privateEvents);
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    async function getRsoEvents() {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                userID: user,
                })
        };
        await fetch('http://localhost:8080/api/events/getRsos', props)
        .then(async (Success) => {
            let rsoEvents = await Success.json();
            console.log(rsoEvents);
            setRsoEvents(rsoEvents);
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    useEffect(()=> {
        if(permission === "student") {
            document.getElementById("event").style.display = "none";
        }
        if(permission !== "super-admin") {
            document.getElementById("approve-events").style.display = "none";
        }
        getPublicEvents();
        getPrivateEvents();
        getRsoEvents();
    },[])

    function getDate(dateTime){
        let date = Date(dateTime.split('T')[0]);
        return moment(date).format('MMMM DD, YYYY');
    }

    function getTime(dateTime){
        let time = dateTime.split('T')[1].split('.')[0].match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { 
            time = time.slice (1); 
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
            time[0] = +time[0] % 12 || 12; 
        }
        let val = time.join ('');
       
        return val.split(" ")[0].substring(0,val.length-6) + " " + val.split(" ")[1];
    }

    function viewedEvent(eventID) {
        navigate(`/view-event/${user}/${permission}/${universityID}/${eventID}`);
    }

    return (
        <>
        <div className="mainpages">
        <div className="topnav">
            <a className="active" href={`/home/${user}/${permission}/${universityID}`}>Dashboard</a>
            <a  href={`/join/${user}/${permission}/${universityID}`}>Join RSO</a>
            <a href={`/leave/${user}/${permission}/${universityID}`}>Leave RSO</a>
            <a  href={`/create-rso/${user}/${permission}/${universityID}`}>Create RSO</a>
            <a href={`/create-event/${user}/${permission}/${universityID}`} id="event">Create Event</a>
            <a href={`/approve-events/${user}/${permission}/${universityID}`} id="approve-events">Approve Events</a>
            <a href="/sign-in">Log Out</a>
        </div>

            <div className="row row-cols-2 row-cols-sm-3 g-1" style={{marginTop: '10px'}}>
            {publicEvents?.res?.map(publicEvent => 
                <Card style={{ width: '18rem' , margin: '10px'}}>
                <Card.Body>
                    <Card.Title>{publicEvent.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{getDate(publicEvent.eventStart)}</ListGroup.Item>
                        <ListGroup.Item>{getTime(publicEvent.eventStart)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <div className="d-grid">
                <button type="button" className="btn btn-dark" onClick={() => viewedEvent(publicEvent.eventID)}>
                    View
                </button>
            </div>
            </Card>
            )}
            {privateEvents?.res?.map(privateEvent => 
                <Card style={{ width: '18rem' , margin: '10px'}}>
                <Card.Body>
                    <Card.Title>{privateEvent.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{getDate(privateEvent.eventStart)}</ListGroup.Item>
                        <ListGroup.Item>{getTime(privateEvent.eventStart)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <div className="d-grid">
                <button type="button" className="btn btn-dark" onClick={() => viewedEvent(privateEvent.eventID)}>
                    View
                </button>
            </div>
            </Card>
            )}
            {rsoEvents?.res?.map(rsoEvent => 
                <Card style={{ width: '18rem' , margin: '10px'}}>
                <Card.Body>
                    <Card.Title>{rsoEvent.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>{getDate(rsoEvent.eventStart)}</ListGroup.Item>
                        <ListGroup.Item>{getTime(rsoEvent.eventStart)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <div className="d-grid">
                <button type="button" className="btn btn-dark" onClick={() => viewedEvent(rsoEvent.eventID)}>
                    View
                </button>
            </div>
            </Card>
            )}

            <Timeline
            dataSource={{
                sourceType: 'profile',
                screenName: 'UCF_Facilities'
            }}
            options={{
                height: '400',
            }}
            />
        </div>
        </div>
        </>
    

    )
}

export default HomePage;