import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { newChat, onSent, prevPrompts, setRecentPrompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        <i
          class="fa-solid fa-bars menu"
          onClick={() => setExtended((prev) => !prev)}
        ></i>

        <div className="new-chat" onClick={() => newChat()}>
        <i class="fa-solid fa-plus"></i>
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((pp, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(pp)}
                className="recent-entry"
              >
               <i class="fa-solid fa-laptop" style={{fontSize:"20px"}}></i>
                <p>{pp.slice(0, 15)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <i class="fa-solid fa-circle-question"></i>
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <i class="fa-solid fa-clock-rotate-left"></i>
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <i class="fa-solid fa-gear"></i>
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
