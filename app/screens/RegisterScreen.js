import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../components/ActivityIndicator";
import authApi from "../api/auth";
import {
  Form,
  FormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import Screen from "../components/Screen";
import userApi from "../api/users";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);
  const { logIn } = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async ({ email, name, password }) => {
    const result = await registerApi.request({ email, password, name });
    if (!result.ok) {
      if (result.data) return setError(result.data.error);
      else {
        setError("An unexpected error occurred");
        console.log(result);
      }
    }

    const { data: authToken } = await loginApi.request(email, password);
    if (authToken) {
      logIn(authToken);
    }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {error && <ErrorMessage error={error} visible={true} />}
          <FormField
            name="name"
            placeholder="Name"
            icon="account"
            autoCorrect={false}
          />
          <FormField
            name="email"
            placeholder="Email"
            icon="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <FormField
            name="password"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            icon="lock"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Register" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
