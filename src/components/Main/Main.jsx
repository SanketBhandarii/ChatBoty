import React, { useContext, useEffect, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = ({ user }) => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  const navigate = useNavigate();

  const resultContainerRef = useRef(null);

  async function handleLogout() {
    try {
      console.log("clickeeddd");
      const response = await axios.get("http://localhost:8086/api/logout", {
        withCredentials: true,
      });
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (showResult && resultContainerRef.current) {
      resultContainerRef.current.scrollTop =
        resultContainerRef.current.scrollHeight;
    }
  }, [resultData, loading]);

  return (
    <div className="main">
      <div className="nav">
        <p style={{ color: "whitesmoke" }}>ChatGPT</p>
        <div className="head-right">
          <p onClick={() => handleLogout()}>Logout</p>
          <i className="fa-solid fa-circle-user"></i>
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {user}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Suggest beautiful places to see on an upcoming road trip."
                  )
                }
              >
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Briefly summarize this concept: urban planning")
                }
              >
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div
                className="card"
                onClick={() =>
                  onSent("Improve the readability of the following code")
                }
              >
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result" ref={resultContainerRef}>
            <div className="result-title">
              <p style={{ color: "white" }} id="recent-prompt">
                {recentPrompt}
              </p>
            </div>
            <div className="result-data">
              <img
                src="https://freelogopng.com/images/all_img/1681039084chatgpt-icon.png"
                alt=""
                className="main-logo"
              />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div>
              <i className="fa-solid fa-image"></i>
              {input ? (
                <i
                  className="fa-solid fa-circle-arrow-up"
                  onClick={() => onSent()}
                ></i>
              ) : null}
            </div>
          </div>

          <p className="bottom-info">
            Chatgpt may display inaccurate info, including about, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
