import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Component/navbar";
import Home from "./Component/home.js";
import Register from "./Component/ragister";
import { Routes, Route } from "react-router-dom";
import Edit from "./Component/edit.js";
import Detail from "./Component/details.js";
import Department from "./Component/Department/department.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/ragister" Component={Register} />
        <Route exact path="/edit/:id" Component={Edit} />
        <Route exact path="/view/:id" Component={Detail} />
        <Route exact path="/department" Component={Department} />
      </Routes>
    </>
  );
}

export default App;
