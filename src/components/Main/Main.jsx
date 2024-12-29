import React, { useContext, useEffect, useRef, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import darcula from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";


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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const resultContainerRef = useRef(null);
  const [copy, setCopy] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 2000);
    });
  };

  async function handleLogout() {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/logout`, {
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
        <p style={{ color: "whitesmoke" }}>ChatBoty</p>
        <div className="head-right">
          <i className="fa-solid fa-circle-user"></i>
          <p onClick={() => handleLogout()}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </p>
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {user ? user : "Dude"}</span>
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
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div>
                  {resultData.includes("```") ? (
                    resultData.split("```").map((block, index) =>
                      index % 2 === 1 ? (
                        <div key={index} className="code-block">
                          <SyntaxHighlighter
                            language="javascript"
                            style={darcula}
                          >
                            {block}
                          </SyntaxHighlighter>
                          <button
                            key={index}
                            className="copy-button"
                            onClick={() => copyToClipboard(block)}
                          >
                            {copy ? "Copied ✅" : "Copy Code"}
                          </button>
                        </div>
                      ) : (
                        <p key={index}>{block}</p>
                      )
                    )
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  )}
                </div>
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
            Chatbot may display inaccurate info, including about, so
            double-check its responses. Your privacy matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
