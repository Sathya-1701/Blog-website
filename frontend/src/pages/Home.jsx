import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaBookOpen, FaPenFancy } from "react-icons/fa";

function Home() {
  return (
    <div className="home-hero">
      <div className="home-content">
        <h1 className="home-title">Welcome to Your Creative Blog App</h1>
        <p className="home-subtitle">
          Dive into inspiring posts or share your own story with the world.
        </p>
        <div className="home-actions">
          <Link to="/blogs" className="home-card blog-list">
            <FaBookOpen size={40} />
            <h3>Explore Blogs</h3>
            <p>Read the latest articles from our community.</p>
          </Link>
          <Link to="/create-blog" className="home-card create-blog">
            <FaPenFancy size={40} />
            <h3>Create a Post</h3>
            <p>Write and publish your unique content.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
