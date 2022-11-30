import Home from "./view/Home/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./view/Register/Register";
import Login from "./view/Login/Login";
import List from "./view/List/List";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </>
  );
}

export default App;
