import React from "react";
import './Join.css';
import { useParams } from "react-router-dom";

function Join() {
    const { user, permission } = useParams();
    
    return (
       <>
       <div class="topnav">
            <a href={`/home/${user}/${permission}`}>Dashboard</a>
            <a  className="active" href={`/join/${user}/${permission}`}>Join RSO</a>
            <a  href={`/create-rso/${user}/${permission}`}>Create RSO</a>
            <a href={`/create-event/${user}/${permission}`}>Create Event</a>
            <a href="/sign-in">Log Out</a>
        </div>
       <div className="auth-card">
            <div className="auth-content" style={{marginBottom: '285px'}}>
                <form>
                    <h3>Join an RSO</h3>
                    <div className="mb-3">
                        <label>RSO:</label><br />
                        <select name="RSO" id="rso-select" className="select">
                            <option value="">-- Select RSO --</option>
                            <option value="student">Football</option>
                            <option value="admin">Chess</option>
                            <option value="super-admin">Cooking</option>
                        </select>

                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Join
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Join;