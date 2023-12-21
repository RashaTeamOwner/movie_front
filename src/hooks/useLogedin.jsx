/* eslint-disable no-undef */
import { useState } from "react";
// import axios from "axios";
function UseLogedin() {
  const [logedIn, setLogedIn] = useState(true);
  // localStorage.setItem("starsMovie", JSON.stringify([]));
  // let dataToken = localStorage.getItem("token");
  // axios({
  //   method: "get",
  //   url: `${process.env.VITE_API_URL}/users/`,
  //   headers: { Authorization: `Token ${dataToken}` },
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return logedIn;
}

export default UseLogedin;
