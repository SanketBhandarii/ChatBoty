import React, { useEffect, useState } from "react";
import "../Auth/SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [pass, setPass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const userToken = Cookies.get("token");
  //   console.log(userToken);
  //   if(userToken){
  //     navigate("/");
  //   }
  // },[])

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
        "http://localhost:8086/api/login",
        {
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
        setPassword("");
        setEmail("");
        navigate("/");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="signup-container">
        <div className="left">
          <h2>Login Yourself</h2>
          <p>
            Don't have an account
            <NavLink
              to={"/signup"}
              style={{ color: "rgb(138, 197, 237)", textDecoration: "none" }}
            >
              {" "}
              SignUp
            </NavLink>
          </p>
          <form
            className="signup-form"
            method="POST"
            onSubmit={(event) => handleSubmit(event)}
          >
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
                style={{ top: "230px" }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash"
                onClick={() => setPass(!pass)}
                style={{ top: "230px" }}
              ></i>
            )}
            <button>Login</button>
          </form>
        </div>
        <div className="right">
          <h2 id={msg ? "success-msg" : null}>
            {msg ? msg : "Hello, Friend!"}
          </h2>
          <p>Enter your details and start journey with us</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
