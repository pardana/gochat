import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as ChatActions from "./store/actions/chatActions";
import { Component } from "react";

class App extends Component {
  componentDidMount() {
    this.props.setupSocket();
  }

  render() {
    return (
      <div className="App">
        <button
          onClick={(e) => {
            e.preventDefault();
            if (this.props.socket) {
              this.props.socket.send(
                JSON.stringify({
                  type: "Hello",
                  data: "World",
                })
              );
            }
          }}
        >
          Send Message
        </button>

        <BrowserRouter>
          <Switch>
            <Route
              path="/login"
              render={(props) => {
                return <h1>Login</h1>;
              }}
            />

            <Route
              path="/"
              render={(props) => {
                return <h1>Root</h1>;
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.auth,
  ...state.chat,
});

const mapDispatchToProps = (dispatch) => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
