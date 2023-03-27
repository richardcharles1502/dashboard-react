import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './style.css';
import Dashboard from "./Dashboard";
import { useSelector } from "react-redux/es/exports";

function App(){
    const islogin = useSelector((state) => state.login.isloggedin);
    const token = localStorage.getItem('token_login');
    
    return (
        <div>
            <Header /><br/>
            <BrowserRouter>
             <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login"  element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                {/* need to check */}
                <Route exact path="/dashboard" element={ ((islogin || token) !== null) ? <Dashboard /> : <Login/>} />
             </Routes>    
            </BrowserRouter>
        </div>
    )
}

export default App;