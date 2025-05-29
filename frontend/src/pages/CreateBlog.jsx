import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBlog.css";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
      alert("You must be logged in to create a blog post.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/blogposts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set 'Content-Type' header here with FormData!
        },
        body: formData,
      });

      if (response.ok) {
        alert("Blog post created successfully!");
        navigate("/blogs");
      } else {
        const errorData = await response.json();
        console.error("Failed to create blog post:", errorData);
        alert("Failed to create blog post.");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="createblog-container">
      <h2>Create New Blog</h2>
      <form onSubmit={handleSubmit} className="createblog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateBlog;
