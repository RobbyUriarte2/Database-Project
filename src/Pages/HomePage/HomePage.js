import React from "react";
import './HomePage.css';
import { Card, ListGroup } from "react-bootstrap";

function HomePage() {
    const obj1 = {
        Name: "Sprit Splash",
        Date: "10/20/25",
        Time: "5:35 PM",
      };
    const obj2 = {
        Name: "Graduation",
        Date: "10/20/25",
        Time: "2:00 PM",
    };
    const obj3 = {
        Name: "Basketball Game",
        Date: "10/20/25",
        Time: "2:00 PM",
    };
    const obj4 = {
        Name: "Football Game",
        Date: "10/20/25",
        Time: "2:00 PM",
    };
    const obj5 = {
        Name: "5K Run",
        Date: "10/20/25",
        Time: "2:00 PM",
    };
    let events = [obj1, obj2, obj3, obj4, obj5];
    return (
        <>
        <div className="mainpages">
        <div class="topnav">
            <a class="active" href="/home">Dashboard</a>
            <a href="/join">Join RSO</a>
            <a href="/create-rso">Create RSO</a>
            <a href="/create-event">Create Event</a>
            <a href="/sign-in">Log Out</a>
        </div>

        <div className="row row-cols-2 row-cols-sm-3 g-1" style={{marginTop: '10px'}}>
          {Object.keys(events).map((key) => (
                    <>
                    
                    <Card style={{ width: '18rem' , margin: '10px'}}>
                        <Card.Body>
                            <Card.Title>{events[key]["Name"]}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Date: {events[key]["Date"]}</ListGroup.Item>
                                <ListGroup.Item>Time: {events[key]["Time"]}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <div className="d-grid">
                        <button type="submit" className="btn btn-dark">
                            View
                        </button>
                    </div>
                    </Card>
                    </>
                ))}
            </div>
            </div>
        </>
    

    )
}

export default HomePage;