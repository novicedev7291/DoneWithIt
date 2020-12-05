import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Icon from "./Icon";
import Text from "./Text";

function CategoryPickerItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name={item.icon} size={80} backgroundColor={item.backgroundColor} />
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: "33%",
    alignItems: "center",
  },
  text: {
    paddingTop: 5,
    textAlign: "center",
  },
});

export default CategoryPickerItem;
