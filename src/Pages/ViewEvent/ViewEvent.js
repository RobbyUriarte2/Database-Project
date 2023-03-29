import { useEffect, useState} from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

function ViewEvent() {
    const { user, permission, universityID, eventID } = useParams();

    const [viewedEvent, setViewedEvent] = useState([]);

    async function getEvent() {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                eventID: eventID,
                })
        };
        await fetch('http://localhost:8080/api/events/event', props)
        .then(async (Success) => {
            let event = await Success.json();
            console.log(event);
            setViewedEvent(event);
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
        getEvent();
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
            <a href={`/approve-events/${user}/${permission}/${universityID}`} id="approve-events">Approve Events</a>
            <a href="/sign-in">Log Out</a>
        </div>

            <div className="row row-cols-2 row-cols-sm-3 g-1" style={{marginTop: '10px'}}>
            {viewedEvent?.res?.map(viewedEvent => 
                <Card style={{ width: '18rem', alignItems: 'center' }}>
                <Card.Header>{viewedEvent.name}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Start: {getDate(viewedEvent.eventStart)}</ListGroup.Item>
                    <ListGroup.Item>Start: {getTime(viewedEvent.eventStart)}</ListGroup.Item>
                    <ListGroup.Item>{(viewedEvent.description)}</ListGroup.Item>
                    <ListGroup.Item>{(viewedEvent.email)}</ListGroup.Item>
                    <ListGroup.Item>{(viewedEvent.contactPhone)}</ListGroup.Item>
                    <ListGroup.Item>End: {getDate(viewedEvent.eventEnd)}</ListGroup.Item>
                    <ListGroup.Item>End: {getTime(viewedEvent.eventEnd)}</ListGroup.Item>
                </ListGroup>
                <div className="d-grid">
            </div>
            </Card>
            )}
        </div>
        </div>
        </>
    

    )
}

export default ViewEvent;