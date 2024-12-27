import React, { useState } from "react";
import "../Auth/SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function SignUp() {
  const [pass, setPass] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // useEffect(() => {
  //   const userToken = Cookies.get("token");
  //   if(userToken){
  //     navigate("/");
  //   }
  // },[])

  function handleName(event) {
    setUsername(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePass(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/signup`,
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setMsg(response.data.msg);
      setTimeout(() => {
        setMsg("");
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/login");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="signup-container">
        <div className="left">
          <h2 id={msg ? "success-msg" : null}>{msg ? msg : "Sign Up"}</h2>
          <p>
            Already have account
            <NavLink
              to={"/login"}
              style={{ color: "rgb(138, 197, 237)", textDecoration: "none" }}
            >
              {" "}
              Login
            </NavLink>
          </p>
          <form
            className="signup-form"
            method="POST"
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(event) => handleName(event)}
              required
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(event) => handleEmail(event)}
              required
            />
            <input
              type={pass ? "password" : "text"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={(event) => handlePass(event)}
              required
            />
            {pass ? (
              <i
                className="fa-regular fa-eye"
                onClick={() => setPass(!pass)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setPass(!pass)}
              ></i>
            )}
            <button>Sign Up</button>
          </form>
        </div>
        <div className="right">
          <h2>Hello, Friend!</h2>
          <p>Enter your details and start journey with us</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
