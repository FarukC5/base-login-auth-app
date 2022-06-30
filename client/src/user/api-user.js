import axios from "axios";

const create = async (user) => {
  try {
    const res = await axios.post("api/users", user);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

const list = async () => {
  try {
    const res = await axios.get("api/users");
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

const read = async (params, token) => {
  try {
    const res = await axios.get(
      `api/users/${params.userId}`
    );
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return err.response.data;
    } else {
      return err;
    }
  }
};

export { create, list, read };
