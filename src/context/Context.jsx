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

  const newChat = () => {
    setInput("");
    setResultData("");
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    const query = prompt || input;
    if (!query) return;

    setInput("");
    setResultData("");
    setLoading(true);
    setShowResult(true);

    if (!prompt) {
      setPrevPrompts((prev) => [query, ...prev]);
    }

    try {
      const response = await run(query);

      // Directly render plain text without unnecessary HTML tags
      const formattedResponse = response
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
        .trim();

      const words = formattedResponse.split(" ");
      setResultData("");
      words.forEach((word, index) => {
        setTimeout(() => {
          setResultData((prev) => prev + word + " ");
        }, 75 * index);
      });
    } catch (error) {
      console.log(error);
      
      setResultData("Error retrieving response. Please try again.");
    } finally {
      setLoading(false);
      setRecentPrompt(query);
    }
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
    newChat,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
