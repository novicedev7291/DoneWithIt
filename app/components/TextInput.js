import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function AppTextInput({ icon, width, ...rest }) {
  return (
    <View style={[styles.container, { width: width ? width : "100%" }]}>
      {icon && (
        <MaterialCommunityIcons style={styles.icon} size={20} name={icon} />
      )}
      <TextInput
        placeholderTextColor={colors.medium}
        style={defaultStyles.textInput}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    flexDirection: "row",
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
