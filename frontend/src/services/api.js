// src/services/api.js

const BASE_URL = "http://127.0.0.1:8000/api";

// Get auth headers with token if available
function getAuthHeaders() {
  const access = localStorage.getItem("access");
  return {
    "Content-Type": "application/json",
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };
}

// --- Authentication ---

// Login user
export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }
  return response.json(); // returns { access, refresh }
}

// Register user
export async function register(username, email, password) {
  const response = await fetch(`${BASE_URL}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Registration failed");
  }
  return response.json();
}

// --- Blog operations ---

// Fetch all blogs
export async function fetchBlogs() {
  const response = await fetch(`${BASE_URL}/blogs/`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}

// Fetch single blog by ID
export async function fetchBlogById(id) {
  const response = await fetch(`${BASE_URL}/blogs/${id}/`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch blog");
  }
  return response.json();
}

// Create a new blog
export async function createBlog(blogData) {
  const response = await fetch(`${BASE_URL}/blogs/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    throw new Error("Failed to create blog");
  }
  return response.json();
}

// Update existing blog
export async function updateBlog(id, blogData) {
  const response = await fetch(`${BASE_URL}/blogs/${id}/`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(blogData),
  });
  if (!response.ok) {
    throw new Error("Failed to update blog");
  }
  return response.json();
}

// Delete blog
export async function deleteBlog(id) {
  const response = await fetch(`${BASE_URL}/blogs/${id}/`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }
  return true;
}
