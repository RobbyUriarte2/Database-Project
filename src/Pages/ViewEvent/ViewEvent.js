import { useEffect, useState} from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

function ViewEvent() {
    const { user, permission, universityID, eventID } = useParams();

    const [viewedEvent, setViewedEvent] = useState([]);

    const [comments, setComments] = useState([]);

    const [userComments, setUserComments] = useState([]);

    const [ratings, setRatings] = useState([]);

    const [sumRatings, setSumRatings] = useState([]);

    async function getComments() {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                eventID: eventID,
                })
        };
        await fetch('http://localhost:8080/api/comment/eventcomments', props)
        .then(async (Success) => {
            let comment = await Success.json();
            console.log(comment);
            setComments(comment);
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    async function getUserComments() {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                eventID: eventID,
                userID: user
                })
        };
        await fetch('http://localhost:8080/api/comment/usereventcomments', props)
        .then(async (Success) => {
            let comment = await Success.json();
            console.log(comment);
            setUserComments(comment);
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }

    async function getRatings() {
        const props = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                eventID: eventID,
                })
        };
        await fetch('http://localhost:8080/api/rating/eventratings', props)
        .then(async (Success) => {
            let rating = await Success.json();
            console.log(rating);
            setRatings(rating);
            },
            (failure) => {
                console.error(failure); 
            },
        );
    }
    

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

    async function createComment(event) {
        event.preventDefault();
        document.getElementById("message").style.display = "none";
        const props = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              eventID: eventID,
              userID: user,
              comment: document.getElementById("event-comment").value,
              })
        };
        await fetch('http://localhost:8080/api/comment/', props)
        .then(async (Success) => {
            let comment = await Success.json();
            console.log(comment);
            document.getElementById("message").style.display = "";
            document.getElementById("message").innerText = "Comment Added!"
            getComments();
            getUserComments();
            },
            (failure) => {
                console.error(failure); 
            },
        );
      }

      async function editComment(event) {
        event.preventDefault();
        document.getElementById("edit-message").style.display = "none";
        const props = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
                commentID: document.getElementById("comment-select").value,
                comment: document.getElementById("edit-event-comment").value,
                eventID: eventID,
                userID: user,
              })
        };
        await fetch('http://localhost:8080/api/comment/update', props)
        .then(async (Success) => {
            let comment = await Success.json();
            console.log(comment);
            document.getElementById("edit-message").style.display = "";
            document.getElementById("edit-message").innerText = "Comment Edited!"
            getUserComments();
            getComments();
            },
            (failure) => {
                console.error(failure); 
            },
        );
      }

      async function deleteComment(event) {
        event.preventDefault();
        document.getElementById("delete-message").style.display = "none";
        const props = {
          method: 'DELETE',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
                commentID: document.getElementById("comment-select-delete").value,
              })
        };
        await fetch('http://localhost:8080/api/comment/delete', props)
        .then(async (Success) => {
            let comment = await Success.json();
            console.log(comment);
            document.getElementById("delete-message").style.display = "";
            document.getElementById("delete-message").innerText = "Comment Deleted!"
            getUserComments();
            getComments();
            },
            (failure) => {
                console.error(failure); 
            },
        );
      }

      async function createRating(event) {
        event.preventDefault();
        document.getElementById("message").style.display = "none";
        const props = {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
              eventID: eventID,
              userID: user,
              rating: document.getElementById("event-rating").value,
              })
        };
        await fetch('http://localhost:8080/api/rating/', props)
        .then(async (Success) => {
            let comment = await Success.json();
            console.log(comment);
            document.getElementById("message").style.display = "";
            document.getElementById("message").innerText = "Rating Added!"
            getRatings();
            },
            (failure) => {
                console.error(failure); 
            },
        );
      }

    useEffect(()=> {
        document.getElementById("commentform").addEventListener("submit", function(event){createComment(event)});
        document.getElementById("ratingform").addEventListener("submit", function(event){createRating(event)});
        document.getElementById("editcommentform").addEventListener("submit", function(event){editComment(event)});
        document.getElementById("deletecommentform").addEventListener("submit", function(event){deleteComment(event)});
        if(permission === "student") {
            document.getElementById("event").style.display = "none";
        }
        if(permission !== "super-admin") {
            document.getElementById("approve-events").style.display = "none";
        }
        getEvent();
        getComments();
        getRatings();
        getUserComments();
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
            
            <div style={{backgroundColor:"white"}}>
                <div style={{marginTop: "20px"}}>
                    <label style={{backgroundColor:"white"}}>Comments</label>
                    <ListGroup variant="flush">
                    {comments?.res?.map(comment =>                     
                    <ListGroup.Item>{(comment.comment)}</ListGroup.Item>      
                    )}
                    </ListGroup>

                    <form id="commentform">
                    <div className="mb-3">
                        <label>Add a Comment</label>
                        <textarea id="event-comment" className="form-control" placeholder="Comment..." rows="3" cols="40" required/>
                    </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Create
                                </button>
                            </div>
                            <span id="message"></span>
                        </form>


                        <br></br>
                </div>

                <div style={{marginTop: "20px"}}>
                    <label>Ratings</label>
                    <ListGroup variant="flush">
                    {ratings?.res?.map(rating =>                     
                    <ListGroup.Item>{(rating.rating)}</ListGroup.Item>      
                    )}
                    </ListGroup>

                    <form id="ratingform">
                    <div className="mb-3">
                        <label>Add a Rating</label>
                        <input type = "number" id="event-rating" className="form-control" placeholder="Rating..." rows="3" cols="40" required/>
                    </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Create
                                </button>
                            </div>
                            <span id="message"></span>
                        </form>
                </div>

                <div style={{backgroundColor:"white"}}>
                <div style={{marginTop: "20px"}}>
                    <label style={{backgroundColor:"white"}}>Comment: </label>
                    <select name="RSO" id="comment-select" className="select" required>
                        <option value="">-- Select A Comment --</option>
                        {userComments?.res?.map(comment => <option value={comment.commentID}>{comment.comment}</option>)}
                    </select>


                    <form id="editcommentform">
                    <div className="mb-3">
                        <label>Edit Comment</label>
                        <textarea id="edit-event-comment" className="form-control" placeholder="Comment..." rows="3" cols="40" required/>
                    </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Edit
                                </button>
                            </div>
                            <span id="edit-message"></span>
                        </form>


                        <br></br>
                </div>
                </div>

                <div style={{backgroundColor:"white"}}>
                <div style={{marginTop: "20px"}}>
                    <label style={{backgroundColor:"white"}}>Comment: </label>
                    <select name="RSO" id="comment-select-delete" className="select" required>
                        <option value="">-- Select A Comment --</option>
                        {userComments?.res?.map(comment => <option value={comment.commentID}>{comment.comment}</option>)}
                    </select>


                    <form id="deletecommentform">
                    <div className="mb-3">
                        <label>Delete A Comment</label>
                    </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Delete
                                </button>
                            </div>
                            <span id="delete-message"></span>
                        </form>


                        <br></br>
                </div>
                </div>
                
            </div>
        </div>
        </>
    

    )
}

export default ViewEvent;