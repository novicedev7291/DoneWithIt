import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import defaultStyles from "../config/styles";
import Text from "./Text";
import PickerItem from "./PickerItem";

function AppPicker({
  icon,
  items,
  width,
  placeholder,
  selectedItem,
  onSelectItem,
  PickerItemComponent = PickerItem,
  numOfColumns,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
        <View style={[styles.container, { width: width ? width : "100%" }]}>
          {icon && (
            <MaterialCommunityIcons style={styles.icon} size={20} name={icon} />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            size={20}
            name="chevron-down"
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
        <FlatList
          data={items}
          numColumns={numOfColumns}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              onPress={() => {
                setModalVisible(!modalVisible);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </>
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
  placeholder: {
    color: defaultStyles.colors.medium,
  },
  text: {
    flex: 1,
  },
});

export default AppPicker;
