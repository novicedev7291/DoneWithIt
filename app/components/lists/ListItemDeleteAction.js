import React from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import colors from "../../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function ListItemDeleteAction({ onPress }) {
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name="trash-can" color={colors.white} size={35} />
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.danger,
    width: 70,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListItemDeleteAction;
