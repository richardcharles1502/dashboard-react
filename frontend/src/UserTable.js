import axios from "axios";
import { useEffect, useState } from "react";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dashboardaction } from "./slices/DashboardSlice";

const UserTable = () => {
  const [userdata, setuserdata] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const superuser = localStorage.getItem("token_super_auth");

  const getuser = async () => {
    try {
      axios.get("http://localhost:4200/allusers").then(function (res) {
        setuserdata(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleupdate = (data) => {
    try {
      axios.get("http://localhost:4200/user/" + data).then(function (res) {
        //call redux and store
        dispatch(Dashboardaction.updateuser(res.data));
        navigate("/register");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handledelete = (data) => {
    try {
      axios
        .delete("http://localhost:4200/deletuser/" + data)
        .then(function (res) {
          console.log(res);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getuser();
  }, [userdata]);

  return (
    <div>
      <table id="customers">
        <tr>
          <th>firstname</th>
          <th>lastname</th>
          <th>email</th>
          <th>password</th>
          <th>Usergroup</th>
          {superuser ? <th>Update</th> : ''}
          {superuser ? <th>Delete</th> : ''}
        </tr>
        {userdata &&
          userdata.map((user, index) => (
            <tr>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                {user.usergroup === 0
                  ? "Super User"
                  : user.usergroup === 1
                  ? "Admin"
                  : user.usergroup === 2
                  ? "Customer"
                  : "Guest"}
              </td>
              {superuser ? (
                <td>
                  <button onClick={() => handleupdate(user.email)}>
                    Update
                  </button>{" "}
                </td>
              ) : (
                ""
              )}

              {superuser ? (
                <td>
                  <button onClick={() => handledelete(user.email)}>
                    Delete
                  </button>{" "}
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default UserTable;
