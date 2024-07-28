import api from "./api";

async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("no refresh token");
    }
    const response = await api.post("/authorization/refresh-token", {
      refreshToken,
    });

    if (response.status !== 200) {
      throw new Error("could not refresh token");
    }

    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("refresh_token", response.refreshToken);
    return response.token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default refreshToken;
