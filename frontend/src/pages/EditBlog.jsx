import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBlog.css";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // preview or existing image
  const [newImageFile, setNewImageFile] = useState(null); // file for upload

  useEffect(() => {
    // Fetch blog details
    fetch(`http://127.0.0.1:8000/api/blogposts/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blog details");
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image); // image URL
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        alert("Error loading blog data.");
      });
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (newImageFile) {
      formData.append("image", newImageFile);
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/blogposts/${id}/`, {
        method: "PATCH", // PATCH = partial update (better than PUT)
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Update response:", result);

      if (!response.ok) {
        alert("Update failed: " + JSON.stringify(result));
        return;
      }

      alert("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("You are not authorized to edit this blog.");
    }
  };

  return (
    <div className="editblog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit} className="editblog-form">
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

        {image && (
          <div className="image-preview">
            <img src={image} alt="Blog Preview" />
          </div>
        )}

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditBlog;
