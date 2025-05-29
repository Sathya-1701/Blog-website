import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BlogList.css";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/blogposts/");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data.results); // assuming backend sends { results: [...] }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <div className="bloglist-container">
      <h2 className="bloglist-title">All Blogs</h2>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-item">
            <Link to={`/blogs/${blog.id}`} className="blog-link">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-summary">{blog.content.slice(0, 100)}...</p>
                <p className="blog-username">By <strong>{blog.author}</strong></p>

              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
