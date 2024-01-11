import HomePage from "./components/landing/HomePage";
import HandleLogin from "./components/login/HandleLogin";
import NotFoundPage from "./components/NotFoundPage";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  // swal alert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 10000,
    timerProgressBar: true,
    padding: "10px",
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    if (!isOnline) {
      Toast.fire({
        icon: "warning",
        title: "<p style='direction:rtl'>اینترنت شما متصل نیست</p>",
        width: "300px",
        iconColor: "red",
      });
    }
  }, [isOnline]);
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // اضافه کردن event listenerها
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // حذف event listenerها پس از unmount شدن کامپوننت
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div style={{ position: "relative" }}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={() => <HandleLogin targetEle={"in"} forgotpass={false} />} />
        <Route exact path="/forgot" component={() => <HandleLogin targetEle={"in"} forgotpass={true} />} />
        <Route exact path="/signup" component={() => <HandleLogin targetEle={"up"} forgotpass={true} />} />
        <Route path="/not-found" component={NotFoundPage} />
        <Redirect from="*" to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
