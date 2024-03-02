/* eslint-disable no-undef */
import axios from "axios";
import { useState } from "react";
function HandleUsersNotProvide() {
  const [user, setUser] = useState("");
  const handlePostUser = () => {
    axios({
      method: "post",
      url: `${process.env.VITE_API_URL}/api/v1/auth/register-as-admin/`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Token 948be8cb47c68873fa3234418e37a1b7de8bc75b",
      },
      data: {
        student_id: user,
      },
    })
      .then((res) => {
        alert(res.data.detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <input type="number" value={user} onChange={(e) => setUser(e.target.value)} />
      <button onClick={handlePostUser}>Submit</button>
    </div>
  );
}

export default HandleUsersNotProvide;
