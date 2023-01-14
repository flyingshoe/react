import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch";

const MyComp = () => {
  const { response, loading, error } = useFetch("http://localhost:1234/");
  const [name, setName] = useState("STARTING");
  const [showName, setShowName] = useState(true);
  const change = () => {
    setTimeout(() => {
      setName("CHANGED!!!");
    }, 4000);
  };
  return (
    <div className="App">
      {showName && name}
      <button onClick={change}>Change</button>
      <button onClick={()=>setShowName(false)}>Hide Show name</button>
      <h1>useFetch Usage</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {response && <p>{response.name}</p>}
      <Button component={Link} to="/asd">
        Next page
      </Button>
    </div>
  );
};

export default MyComp;
