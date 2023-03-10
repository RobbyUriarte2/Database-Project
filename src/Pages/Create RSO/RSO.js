import React from "react";
import './RSO.css';

function RSO() {
    return (
       <>
       <div class="topnav">
            <a href="/home">Dashboard</a>
            <a  href="/join">Join RSO</a>
            <a class="active" href="/create-rso">Create RSO</a>
            <a href="/create-event">Create Event</a>
            <a href="/sign-in">Log Out</a>
        </div>
       <div className="auth-card">
            <div className="auth-content">
                <form>
                    <h3>Create an RSO</h3>
                    <div className="mb-3">
                <label>Name</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Enter RSO Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea id="ros-description" className="form-control" placeholder="Description..." rows="3" cols="40" required/>
                
              </div>
              <div className="mb-3">
                <label>Member 1</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Member 2</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Member 3</label>
                <input
                  type="name"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Member 4</label>
                <input
                  type="name"
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

export default RSO;