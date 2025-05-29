import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogDetail.css"

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/blogposts/${id}/`) // your Django API URL for blog detail
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog");
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading blog...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="blog-detail-container">
      {blog.image && (
        <img
          src={blog.image} // backend should return full URL here
          alt={blog.title}
          className="blog-detail-image"
        />
      )}
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p>
        <strong>By:</strong> {blog.author || blog.username}
      </p>
      <Link to={`/edit/${blog.id}`} className="edit-link">
        Edit Blog
      </Link>
    </div>
  );
}

export default BlogDetail;
