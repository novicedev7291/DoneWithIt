import React from "react";
import { useFormikContext } from "formik";

import Picker from "../Picker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  name,
  items,
  width,
  placeholder,
  PickerItemComponent,
  numOfColumns,
}) {
  const { errors, touched, values, setFieldValue } = useFormikContext();
  return (
    <>
      <Picker
        width={width}
        items={items}
        numOfColumns={numOfColumns}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        onSelectItem={(item) => setFieldValue(name, item)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
