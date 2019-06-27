import React, { useState } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { logout } from "../../../actions/auth";
import UserCP from "../Header/utils/UserCP";

const PublicHeader = (props) => {
  // Inidicator for click actions.
  const [isActive, ifActive] = useState(false);
  const isFocused = () => isActive !== true ? ifActive(true) : ifActive(false);
  
    const { id, auth, history } = props

  return (
    <div className="container__header">
      <div className="header">
        <span>
          Welcome{!auth ? `, Guest` : `back, user: ${id}`}
        </span>
        <UserCP isFocused={isFocused} isActive={isActive} history={history} />
      </div>
      <div
        className={
          isActive === true ? "dropdown-overlay open" : "dropdown-overlay"
        }
        onClick={isFocused}
      />
    </div>
  );
};

const mapToStateProps = state => {
  return {
    auth: !!state.auth.userId,
    id: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(
  withApollo(
    connect(
      mapToStateProps,
      mapDispatchToProps
    )(PublicHeader)
  )
);
