import React, { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import NotePad from "./pages/NotePad";
import Create from "./pages/NotePadComponent/Create";
import Update from "./pages/NotePadComponent/Update";
import Landing from "./pages/Landing";
function App() {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
      console.log(token);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/login"} element={<Login setToken={setToken} />} />
        <Route path={"/signup"} element={<SignUp />} />
        {token && (
          <>
            <Route path={"/notepad"} element={<NotePad token={token} />} />
            <Route path="/create" element={<Create token={token} />} />
            <Route path="/:id" element={<Update token={token} />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
