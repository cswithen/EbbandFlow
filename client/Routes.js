import React, { Component } from "react";
import { withRouter, Route, Switch, Redirect} from "react-router-dom";
import Login from "./components/AuthForm";
import Home from "./components/LandingPage";
// import { me } from "./store";

export default class Routes extends Component {
  // componentDidMount() {
  //   this.props.loadInitialData();
  // }

  render() {
    // const { isLoggedIn } = this.props;

    return (
      <div>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Redirect to="/home" />
          </Switch>
      </div>
    );
  }
}

// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

// export default withRouter(connect(mapState, mapDispatch)(Routes));
