import jwtDecode from "jwt-decode";
import * as Storage from "expo-secure-store";

const key = "authToken";

const store = async (token) => {
  try {
    await Storage.setItemAsync(key, token);
  } catch (error) {
    console.log("Error storing token in storage", error);
  }
};

const getToken = async () => {
  try {
    return await Storage.getItemAsync(key);
  } catch (error) {
    console.log("Error getting stored token", error);
  }
};

const removeToken = async () => {
  try {
    await Storage.deleteItemAsync(key);
  } catch (error) {
    console.log("Error removing token from storage", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

export default {
  getToken,
  removeToken,
  store,
  getUser,
};
