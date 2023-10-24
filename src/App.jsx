import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Home from './components/Home'
import Navbar from './components/Navbar';
import Login from "./components/Login";
import DashBoard from './components/DashBoard';

function App() {
  return (
    <>
      <h1>hello, world!</h1>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>

      </Routes>
    </>
  );
}

export default App;
