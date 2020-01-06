import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { setAuthorizationToken, setCurrentUser } from "./store/actions/auth";
import jwtDecode from "jwt-decode";



const store = configureStore()
if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    // prevent someone from manually tampering with the key of jwtToken in localStorage
    try {
      store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (e) {
      store.dispatch(setCurrentUser({}));
    }
  }
  


ReactDOM.render(
<Provider store = {store}>
    <Router>
        <App /> 
    </Router>
</Provider>, document.getElementById("root"));
registerServiceWorker();
