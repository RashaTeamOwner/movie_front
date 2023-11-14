// import HomePage from "./components/landing/HomePage";
import HandleLogin from "./components/login/HandleLogin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div style={{ position: "relative" }}>
      <Switch>
        <Route path="/signin" component={() => <HandleLogin targetEle={"in"} />} />
        <Route path="/signup" component={() => <HandleLogin targetEle={"up"} />} />
      </Switch>
    </div>
  );
}

export default App;
