import React from "react";
import { StyleSheet, Text, Platform, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "primary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 60,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginVertical: 10,
  },
  title: {
    fontSize: Platform.OS === "android" ? 20 : 18,
    fontWeight: "bold",
    color: colors.white,
    textTransform: "uppercase",
  },
});

export default AppButton;
