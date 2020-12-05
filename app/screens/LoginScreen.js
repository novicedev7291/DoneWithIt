import React, { useState, useContext } from "react";
import { Image, StyleSheet } from "react-native";
import * as Yup from "yup";

import authApi from "../api/auth";
import { Form, FormField, SubmitButton } from "../components/forms";
import ErrorMessage from "../components/forms/ErrorMessage";
import Screen from "../components/Screen";
import useAuth from "../hooks/useAuth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const { logIn } = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    if (!result.ok) return setLoginFailed(true);

    logIn(result.data);
  };

  return (
    <Screen>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          style={styles.error}
          error="Invalid email or password"
          visible={loginFailed}
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
        <SubmitButton title="login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
