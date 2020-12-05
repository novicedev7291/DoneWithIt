import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import CategoryPickerItem from "../components/CategoryPickerItem";
import {
  Form,
  FormField as Field,
  FormPicker as Picker,
  SubmitButton as Button,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingApi from "../api/listings";
import Screen from "../components/Screen";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.string().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select atleast one image"),
});

const categories = [
  {
    label: "Furniture",
    value: 1,
    icon: "chair-rolling",
    backgroundColor: "tomato",
  },
  {
    label: "Clothing",
    value: 2,
    icon: "shopping",
    backgroundColor: "yellowgreen",
  },
  { label: "Camera", value: 3, icon: "camera", backgroundColor: "blue" },
];

function ListingEditScreen(props) {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  const handlePost = async (values, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingApi.postListing(
      { ...values, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not post the listing");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handlePost}
      >
        <FormImagePicker name="images" />
        <Field maxLength={255} placeholder="Title" name="title" />
        <Field
          maxLength={8}
          keyboardType="numeric"
          placeholder="$ Price"
          name="price"
          width={120}
        />
        <Picker
          items={categories}
          placeholder="Category"
          width="50%"
          numOfColumns={3}
          name="category"
          PickerItemComponent={CategoryPickerItem}
        />
        <Field
          maxLength={255}
          multiline={true}
          numberOfLines={3}
          placeholder="Description"
          name="description"
        />
        <Button title="post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
