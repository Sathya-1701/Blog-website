import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import "./Signup.css"; // Import the CSS file

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // initialize navigate

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");
      navigate("/login"); // Redirect to login page (assuming login is at "/")
        // Optionally redirect to login page
      } else {
        alert(`Registration failed: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;
