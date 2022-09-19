import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home.jsx";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const fetchFF = async () => {
    const { data } = await axios.get("/users");
    console.log(data);
  };

  useEffect(() => {
    fetchFF();
  }, []);

  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
