import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect} from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
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
