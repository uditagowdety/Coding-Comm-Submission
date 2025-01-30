import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <Link to="/" className="header-item">project name</Link>
                <Link to="/home" className="header-item">home page</Link>
            </header>
            <main className="dashboard-main">
                <section className="profile-section">
                    <div className="profile-picture"></div>
                    <div className="profile-info">
                        <h2>Learner Name</h2>
                        <p>Location</p>
                        <div className="profile-stats">
                            <div>
                                <span>1</span> COURSES
                            </div>
                            <div>
                                <span>6</span> QUESTIONS
                            </div>
                        </div>
                    </div>
                </section>
                <section className="total-stats">
                    <div className="total-stat-box">Skills achieved: 1</div>
                    <div className="total-stat-box">Hours learned: 4</div>
                    <div className="total-stat-box">Hours practiced: 2</div>
                </section>
                <section className="achievements-container">
                    <h3>Achievements</h3>
                    <ul>
                        <li>🏆 Achievement 1</li>
                        <li>🏆 Achievement 2</li>
                    </ul>
                </section>
                <section className="recommendations-container">
                    <h3>Recommended</h3>
                </section>
                <section className="chart-container">
                    <h3>Progress</h3>
                    <div className="chart-placeholder">[Insert Graph]</div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
