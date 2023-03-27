import { useEffect, useState} from "react";
import './HomePage.css';
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

function HomePage() {
    const { user, permission, universityID } = useParams();

    const [events, setEvents] = useState([]);

    async function getPublicEvents() {
        await fetch('http://localhost:8080/api/events/allPublic')
        .then(async (Success) => {
            let publicEvents = await Success.json();
            console.log(publicEvents);
            setEvents(publicEvents);
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
            let events = await Success.json();
            console.log(events);
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
        getPublicEvents();
        //getPrivateEvents();
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

    return (
        <>
        <div className="mainpages">
        <div className="topnav">
            <a className="active" href={`/home/${user}/${permission}/${universityID}`}>Dashboard</a>
            <a  href={`/join/${user}/${permission}/${universityID}`}>Join RSO</a>
            <a href={`/leave/${user}/${permission}/${universityID}`}>Leave RSO</a>
            <a  href={`/create-rso/${user}/${permission}/${universityID}`}>Create RSO</a>
            <a href={`/create-event/${user}/${permission}/${universityID}`} id="event">Create Event</a>
            <a href="/sign-in">Log Out</a>
        </div>

            <div className="row row-cols-2 row-cols-sm-3 g-1" style={{marginTop: '10px'}}>
            {events?.res?.map(event => 
                <Card style={{ width: '18rem' , margin: '10px'}}>
                <Card.Body>
                    <Card.Title>{event.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {getDate(event.eventStart)}</ListGroup.Item>
                        <ListGroup.Item>Time: {getTime(event.eventStart)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <div className="d-grid">
                <button type="submit" className="btn btn-dark">
                    View
                </button>
            </div>
            </Card>
            )}
        </div>
        </div>
        </>
    

    )
}

export default HomePage;