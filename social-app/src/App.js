import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import SignUp from "./pages/sign_up/SignUp";
import PersonProfile from "./pages/profile/PersonProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import Topbar from "./components/topbar/Topbar";
import Error from "./pages/error/Error";

function App() {
  const [render, setRender] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    axios
      .get("/topbar", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          setRender(true);
          setUser(res.data.userProfile);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/home">
          {render && <Topbar user={user} />}
          <Home />
        </Route>
        <Route path="/profile/:username">
          {render && <Topbar user={user} />}
          <PersonProfile />
        </Route>
        <Route path="/profile">
          {render && <Topbar user={user} />}
          <Profile />
        </Route>
        <Route path="/:error">
          <Error />
        </Route>
        <Route path="/">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
