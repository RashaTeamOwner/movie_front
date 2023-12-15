/* eslint-disable no-undef */
import { useState } from "react";
// import axios from "axios";
function useLogedin() {
  const [logedIn, setLogedIn] = useState(true);
  //   let dataToken = localStorage.getItem("token");
  //   console.log(dataToken);
  //   axios({
  //     method: "post",
  //     url: `${process.env.VITE_API_URL}/api/v1/users/`,
  //     headers: { Authorization: `Bearer ${dataToken}`, "Content-Type": "application/json" },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  return logedIn;
}

export default useLogedin;
