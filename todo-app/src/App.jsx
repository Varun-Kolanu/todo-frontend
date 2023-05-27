import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context, server } from "./main";
import axios from "axios";


function App() {
  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);
  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/me`, {
      withCredentials: true
    }).then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((err) => {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
  }, [])


  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App
