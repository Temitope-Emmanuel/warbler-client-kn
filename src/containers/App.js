import React,{Component, Fragment} from "react";
import Navbar from "./Navbar";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "../containers/MessageForm";

class App extends Component{
  state={}


  render(){
    const {currentUser,errors,authUser,removeError} = this.props
    return(
      <div className="onboarding">
        <Navbar />
          <Switch>
        <Route
          exact
          path="/"
          render={props => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                buttonText="Log in"
                heading="Welcome Back."
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={props => {
            return (
              <AuthForm
                removeError={removeError}
                errors={errors}
                onAuth={authUser}
                signUp
                buttonText="Sign me up!"
                heading="Join Warbler today."
                {...props}
              />
            );
          }}
        />
        <Route
          path="/users/:id/messages/new"
          component={withAuth(MessageForm)}
        />
        <Route render={() => <Redirect to="/" /> } /> 
          </Switch>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  };
}


export default withRouter(
  connect(mapStateToProps,{authUser,removeError})(App)
)
