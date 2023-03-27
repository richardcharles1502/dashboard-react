import "./Header.css";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { loginaction } from "./slices/loginSlice";
// import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const isloggedin = useSelector((state) => state.login.isloggedin);
  const token = localStorage.getItem('token_login');
  const handlelogout = () => {
    dispatch(loginaction.logout());
  };

  return (
    <div className="header">
      <h1>Dashboard</h1>
      <div className="header-right" style={{ background: "lightpink" }}>
        {(isloggedin || token)  && <button onClick={handlelogout}>logout</button>}
        {/* <Link to="/register"></Link> */}
      </div>
    </div>
  );
}

export default Header;
