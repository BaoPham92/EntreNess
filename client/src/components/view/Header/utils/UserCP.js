import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../../../view/Modal/Login";
import { logout } from "../../../../actions/auth";
import CreateUser from "../../Modal/CreateUser";

// TODO: RE-DESIGNED USERBAR

const UserCP = props => {
  const { isActive, isFocused, auth, history } = props;

  // Tracker for dropdown items picked by clicks / selection.
  const [picked, setPicked] = useState("");

  return (
    <div className="userCP">
      <ul className="userCP-options">
        <li>
          <div className="userCP-Stats">Stats</div>
        </li>
        <li
          className={isActive === true ? "userCP-icon active" : "userCP-icon"}
          onClick={isFocused}
        >
          <div className="userCP-profile">
            <div> {props.auth.userId ? "User" : "Anon"} </div>
            <div
              className={
                isActive === true ? "userCP-dropdown open" : "userCP-dropdown"
              }
            >
              {props.auth.userId ? (
                <div className="registered-options">
                  <Link to="/UserProfile">
                    <div className="dropdown-option">
                      <h3>Details</h3>
                      <p>Lorem ipsum</p>
                    </div>
                  </Link>
                  <Link to="/UpdateUser">
                    <div className="dropdown-option">
                      <h3>Edit</h3>
                      <p>Lorem ipsum</p>
                    </div>
                  </Link>
                  <Link to="/">
                    <div className="dropdown-option">
                      <h3>Logout</h3>
                      <p>Lorem ipsum</p>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="unregistered-options">
                  <div
                    className="dropdown-option"
                    onClick={e => setPicked(e.currentTarget.textContent)}
                  >
                    <h3>Sign Up</h3>
                  </div>
                  <div
                    className="dropdown-option"
                    onClick={e => setPicked(e.currentTarget.textContent)}
                  >
                    <h3>Login</h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </li>
        <Login
          isActive={isActive}
          isFocused={isFocused}
          picked={picked}
          setPicked={setPicked}
        />
        <CreateUser
          picked={picked}
          setPicked={setPicked}
          isActive={isActive}
          isFocused={isFocused}
          history={history}
        />
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserCP);
