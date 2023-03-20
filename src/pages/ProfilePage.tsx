import React, { memo } from "react";

import Profile from "../components/Profile/Profile";
import { fetchWithAuth } from "../fetchApi/fetchWithAuth";

const ProfilePage = memo(() => {
  // const getDataUserApi = async () => {
  //   await fetchWithAuth("https://dummyjson.com/users/15", {}).then((data) =>
  //     console.log(data)
  //   );
  // };
  // getDataUserApi();
  return (
    <div>
      <Profile></Profile>
    </div>
  );
});

export default ProfilePage;
