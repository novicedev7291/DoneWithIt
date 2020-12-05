import client from "./client";

const register = (user) => client.post("/users", user);

export default {
  register,
};
