import refreshToken from "./refreshToken";
import logout from "../utils/logout";

interface apiConfig {
  url: string;
  method: string;
  body: any;
  headers: any;
}

const url = "http://127.0.0.1:8000";
let token = localStorage.getItem("auth_token");

function getHeaders(Newtoken?: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Newtoken || token}`, //Refresh token or old token
  };
}

// Request interceptor
async function request(config: {
  method: string;
  path: string;
  body?: any;
  refreshedToken?: string;
}): Promise<any> {
  const { method, path, body, refreshedToken } = config;
  const conf: apiConfig = {
    url: `${url}` + path,
    method,
    body,
    headers: getHeaders(refreshedToken),
  };

  try {
    const response = await fetch(conf.url, {
      method: conf.method,
      headers: conf.headers,
      body: JSON.stringify(conf.body),
    });
    const data = await response.json();
    data.status = response.status;

    if (response.status === 401) {
      if (data.message === "expired refresh token") {
        return logout();
      }

      try {
        // refresh token
        token = (await refreshToken()) as string;
        if (!token) throw new Error("could not refresh token");
        config.refreshedToken = token;
        return await request(config);
      } catch (error) {
        console.log(error);
        logout();
        return;
      }
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

//   /$$$$$$  /$$$$$$$  /$$$$$$
//  /$$__  $$| $$__  $$|_  $$_/
// | $$  \ $$| $$  \ $$  | $$
// | $$$$$$$$| $$$$$$$/  | $$
// | $$__  $$| $$____/   | $$
// | $$  | $$| $$        | $$
// | $$  | $$| $$       /$$$$$$
// |__/  |__/|__/      |______/
export default class api {
  static get = (path: string) => request({ method: "GET", path });
  static post = (path: string, body?: any) =>
    request({ method: "POST", path, body });
}
