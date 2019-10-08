import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { withApollo } from "react-apollo";
import { logout } from "../../../actions/auth";
import HeaderNav from './utils/HeaderNav'

const PublicHeader = (props) => {

  return (
    <div className="container__header">
      <HeaderNav
        props={props}
        history={props.history}
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
