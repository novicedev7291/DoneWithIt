import client from "./client";

const login = (email, password) =>
  client.post("/auth", { email: email, password: password });

export default {
  login,
};
