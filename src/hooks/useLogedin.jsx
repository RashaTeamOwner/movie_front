/* eslint-disable no-undef */
import { useState } from "react";
import axios from "axios";
function UseLogedin() {
  const [logedIn, setLogedIn] = useState(true);
  localStorage.setItem("starsMovie", JSON.stringify([]));
  let dataToken = localStorage.getItem("token");
  axios({
    method: "get",
    url: `${process.env.VITE_API_URL}/api/v1/`,
    headers: { Authorization: `Token ${dataToken}` },
  })
    .then((res) => {
      setLogedIn(res.data.is_login);
    })
    .catch((err) => {
      setLogedIn(err.data.is_login);
    });
  return logedIn;
}

export default UseLogedin;
