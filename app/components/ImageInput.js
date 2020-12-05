import React, { useEffect } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import defaultStyles from "../config/styles";

function ImageInput({ imageUri, onChangeImage }) {
  const requestImagePermission = async () => {
    const { granted } = ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("Yon need to provide permissions to gallery.");
  };

  useEffect(() => {
    requestImagePermission();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = () => {
    if (!imageUri) selectImage();
    else {
      Alert.alert("Delete Image", "Are you sure, you want to delete?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleChange}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            size={40}
            name="camera"
            color={defaultStyles.colors.medium}
          />
        )}
        {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 15,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageInput;
