import React, { useEffect, useState } from "react";
import Siderbar from "./components/Sidebar/Siderbar";
import Main from "./components/Main/Main";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function getAuth() {
      
      
      const response = await axios.get("http://localhost:8086/api/home", {
        withCredentials: true,
      });
      if (response.data.msg != "Please do login!") {
        setUser(response.data.username);
        return;
      }
      navigate("/login");
    }
    getAuth();
  }, []);
  return (
    <>
      <Siderbar />
      <Main user={user} />
    </>
  );
};

export default App;
