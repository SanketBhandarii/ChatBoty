import { createContext, useState } from "react";
import run from "../config/chatgpt";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord + " ");
    }, 75 * index);
  };

  const newChat = () => {
     setLoading(false);
     setShowResult(false);
  }

  const onSent = async (prompt) => {
    setInput("");
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      response = await run(input);
      setRecentPrompt(input);
      setPrevPrompts((prev) => [input, ...prev]);
    }

    // Process the response to format bold, line breaks, and bullet points
    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    // Replace * with <br/> for line breaks
    newResponse = newResponse.split("*").join("<br/>");

    // Replace - or • with <br/>• or <br/>- to handle bullet points
    newResponse = newResponse.split("•").join("<br/>•");
    newResponse = newResponse.split(":").join("<br/>");

    // Clear previous result data
    setResultData("");

    // Split newResponse into words and display with delay
    let newResponseArray = newResponse.split(" ");
    newResponseArray.forEach((word, index) => {
      delayPara(index, word);
    });

    setLoading(false);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
