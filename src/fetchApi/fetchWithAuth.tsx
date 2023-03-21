import { LoginUserProps } from "../components/Layout/Auth/Auth";
import jwt_decode from "jwt-decode";
import { Notify } from "../components/UI/Notify/Notify";

export const fetchWithAuth = async (url: string, options: any = {}) => {
  const userData: LoginUserProps = JSON.parse(
    localStorage.getItem("userData")!
  );
  let token: string | null = null;
  if (userData) {
    token = userData.token;
    var decoded: LoginUserProps = jwt_decode(token);
    if (decoded.exp - Math.floor(Date.now() / 1000) > 0)
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    else {
      localStorage.removeItem("userData");
      window.location.href = "/login";
      return;
    }
  } else {
    window.location.href = "/login";
    return;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    Notify(response.status, response.statusText);
    // await new Promise((resolve) => setTimeout(resolve, 100));

    throw new Error(`HTTP error! status: ${response.status}`);
  }
  Notify(response.status, response.statusText);
  // await new Promise((resolve) => setTimeout(resolve, 100));

  const data = await response.json();

  return data;
};
