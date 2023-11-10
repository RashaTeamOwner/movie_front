import HomePage from "./components/landing/HomePage";
import HandleLogin from "./components/login/HandleLogin";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/signin" element={<HandleLogin targetEle={"in"} />} />
        <Route path="/signup" element={<HandleLogin targetEle={"up"} />} />
      </Routes>
      {/* <HandleLogin /> */}
      {/* <HomePage /> */}
    </div>
  );
}

export default App;
