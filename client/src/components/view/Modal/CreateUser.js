import React, { useState } from "react";
import { graphql, withApollo } from "react-apollo";
import Modal from "react-modal";
import { CreateUserMutation } from "../../../mutations/Users";
import { startCreateUser } from "../../../actions/users";

const CreateUser = props => {
  // Input redux state logic.
  const handleChange = e => {
    e.persist();
    props.setState(() => ({ [e.target.name]: e.target.value }));
  };

  // Close Modal
  const closeModal = () => props.setPicked(undefined);

  const {
    picked,
    setPicked,
    isActive,
    isFocused,
    history: {
      location: { pathname }
    }
  } = props;

  return (
    <Modal
      isOpen={picked === "Sign Up"}
      onRequestClose={closeModal}
      contentLabel="CreateUser Modal"
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          const user = props.user;
          const valideAge = user.age >= 16 && user.age <= 99;

          if (user.age && !valideAge) {
            alert("Require age: 16");
          }

          props
            .mutate({ variables: { data: user } })
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }}
      >
        <div className="CP__modal">
          <button onClick={closeModal} className="login--close">
            X
          </button>

          <h2 className="form__head">Create Account</h2>

          <div className="create-user-input">
            <label
              className={
                isActive === "name"
                  ? "input-label-focused"
                  : "create-input-label"
              }
            >
              Username
            </label>
            <input
              onClick={e => isFocused(e)}
              className="create--input"
              type="text"
              name="name"
              required={pathname === "/"}
              onChange={handleChange}
            />
          </div>

          <div className="create-user-input">
            <label
              className={
                isActive === "email"
                  ? "input-label-focused"
                  : "create-input-label"
              }
            >
              Email
            </label>
            <input
              onClick={e => isFocused(e)}
              className="create--input"
              type="text"
              name="email"
              required={pathname === "/"}
              onChange={handleChange}
            />
          </div>

          <div className="create-user-input">
            <label
              className={
                isActive === "password"
                  ? "input-label-focused"
                  : "create-input-label"
              }
            >
              Password
            </label>
            <input
              onClick={e => isFocused(e)}
              className="create--input"
              type="password"
              name="password"
              required={pathname === "/"}
              onChange={handleChange}
            />
          </div>
          <button className="btn__main" type="submit">
            Create Account
          </button>
        </div>
      </form>
    </Modal>
  );
};

const mapMutationToProps = graphql(CreateUserMutation);
const CreateUserWithMutation = withApollo(mapMutationToProps(CreateUser));

export default CreateUserWithMutation;
