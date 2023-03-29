import { useEffect, useState} from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

function ApproveEvents() {
    const { user, permission, universityID } = useParams();

    const [publicEvents, setPublicEvents] = useState([]);
    const [privateEvents, setPrivateEvents] = useState([]);

    async function getPublicEvents() {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                universityID: universityID,
                })
        };
        await fetch('http://localhost:8080/api/events/notVerifiedPublic', props)
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
        await fetch('http://localhost:8080/api/events/notVerifiedPrivate', props)
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

    async function approveEvent(nonVerifiedEvent, type) {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                eventID: nonVerifiedEvent.eventID,
                })
        };
        await fetch('http://localhost:8080/api/events/verify', props)
        .then(async (Success) => {
            let val = await Success.json();
            console.log(val);
            },
            (failure) => {
                console.error(failure); 
            },
        );

        if(type == 1) {
            getPublicEvents();
        }
        else {
            getPrivateEvents();
        }
    }

    useEffect(()=> {
        if(permission === "student") {
            document.getElementById("event").style.display = "none";
        }
        getPublicEvents();
        getPrivateEvents();
    },[])

    return (
        <>
        <div className="mainpages">
        <div className="topnav">
            <a href={`/home/${user}/${permission}/${universityID}`}>Dashboard</a>
            <a href={`/join/${user}/${permission}/${universityID}`}>Join RSO</a>
            <a href={`/leave/${user}/${permission}/${universityID}`}>Leave RSO</a>
            <a href={`/create-rso/${user}/${permission}/${universityID}`}>Create RSO</a>
            <a href={`/create-event/${user}/${permission}/${universityID}`} id="event">Create Event</a>
            <a className="active" href={`/approve-events/${user}/${permission}/${universityID}`} id="approve-events">Approve Events</a>
            <a href="/sign-in">Log Out</a>
        </div>

            <div className="row row-cols-2 row-cols-sm-3 g-1" style={{marginTop: '10px'}}>
            {publicEvents?.res?.map((publicEvent, i) => 
                <Card style={{ width: '18rem' , margin: '10px'}}>
                <Card.Body>
                    <Card.Title>{publicEvent.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {getDate(publicEvent.eventStart)}</ListGroup.Item>
                        <ListGroup.Item>Time: {getTime(publicEvent.eventStart)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <div className="d-grid">
                <button type="button" className="btn btn-dark" key={i} onClick={() => approveEvent(publicEvent,1)}>
                    Approve
                </button>
            </div>
            </Card>
            )}
            {privateEvents?.res?.map((privateEvent, i) => 
                <Card style={{ width: '18rem' , margin: '10px'}}>
                <Card.Body>
                    <Card.Title>{privateEvent.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Date: {getDate(privateEvent.eventStart)}</ListGroup.Item>
                        <ListGroup.Item>Time: {getTime(privateEvent.eventStart)}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                <div className="d-grid">
                <button type="button" className="btn btn-dark" key={i} onClick={() => approveEvent(privateEvent,2)}>
                    Approve
                </button>
            </div>
            </Card>
            )}
        </div>
        </div>
        </>
    )
}

export default ApproveEvents;