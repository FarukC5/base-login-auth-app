import axios from "axios";

//const config = axios.defaults.withCredentials = true

const login = async (user) => {
  try {
    const res = await axios.post("api/users/login", user);

    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

const logout = async () => {
  await axios.get("/api/users/logout");
};

export { login, logout };
