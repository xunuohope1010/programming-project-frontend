import React from 'react';
import './App.css';
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home.component";
import LoginComponent from "./components/login.component";
import SignupComponent from "./components/signup.component";
import ProfileComponent from "./components/profile.component";
import ClassificationComponent from "./components/classification.component";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      redirect:false
    };
  }

  componentDidMount() {
    this.setState({redirect:false})
    const cookie = JSON.parse(localStorage.getItem('cookie'));
    if (cookie) {
      this.setState({
        currentUser: cookie,
      })
      setTimeout(()=> {
        localStorage.clear();
      }, 120000)
    }
  }

  logOut = () => {
    localStorage.removeItem("cookie");
  }


  render() {

    const { currentUser} = this.state;
    return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              Interview
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      Profile
                    </Link>
                  </li>
              )}

              {currentUser && (
                  <li className="nav-item">
                    <Link to={"/classification"} className="nav-link">
                      Classification
                    </Link>
                  </li>
              )}

            </div>

            {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={() => this.logOut()}>
                      LogOut
                    </a>
                  </li>
                </div>
            ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/signup"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home}/>
              <Route exact path="/login" component={LoginComponent}/>
              <Route exact path="/signup" component={SignupComponent}/>
              <Route exact path="/profile" component={ProfileComponent}/>
              <Route exact path="/classification" component={ClassificationComponent}/>
            </Switch>
          </div>
        </div>
    );
  }
}

export default App;
