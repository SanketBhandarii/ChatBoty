import React, { useEffect, useState } from "react";
import Siderbar from "./components/Sidebar/Siderbar";
import Main from "./components/Main/Main";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function getAuth() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/home`, {
          withCredentials: true,
        });
        if (response.data.msg !== "Please do login!") {
          setUser(response.data.username);
          setLoading(false);
          return;
        }
        navigate("/login");
      } catch (error) {
        console.error("Error during authentication check:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    // getAuth();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [BACKEND_URL, navigate]);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <img
            src="https://cdn.dribbble.com/users/1549398/screenshots/6727060/dot_loader.gif"
            className="loader"
            alt="Loading..."
          />
        </div>
      ) : (
        <>
          <Siderbar />
          <Main user={user} />
        </>
      )}
    </>
  );
};

export default App;
