import React from "react";

function Join() {
    return (
       <>
       <div class="topnav">
            <a href="/home">Dashboard</a>
            <a class="active" href="/join">Join RSO</a>
            <a href="/create-rso">Create RSO</a>
            <a href="/create-event">Create Event</a>
            <a href="/sign-in">Log Out</a>
        </div>
       <div className="auth-card">
            <div className="auth-content">
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