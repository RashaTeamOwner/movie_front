import HomePage from "./components/landing/HomePage";
import HandleLogin from "./components/login/HandleLogin";
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

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
        <Route path="/signin" component={() => <HandleLogin targetEle={"in"} />} />
        <Route path="/signup" component={() => <HandleLogin targetEle={"up"} />} />
        <Route path="/" component={() => <HomePage />} />
      </Switch>
    </div>
  );
}

export default App;
