import { AntDesign } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Button, HelperText, Menu, TextInput } from "react-native-paper";
import { useAppDispatch } from "../redux";
import { addCar, updateCar } from "../redux/slices/cars";
import { RootStackParamList } from "../types";
interface Car {
  color: string;
  model: string;
  make: string;
  category: string;
  registrationNo: string;
}

type AddEditCarProps = StackScreenProps<RootStackParamList, "AddEditCar">;
const AddEditCar = ({ navigation, route }: AddEditCarProps) => {
  const params = route?.params;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useAppDispatch();
  const { control, handleSubmit, setValue, reset } = useForm<Car>();
  useEffect(() => {
    if (params?.index) {
      reset({ ...params });
    }
  }, [params]);
  const onSubmit = (data: Car) => {
    if (params?.index) {
      dispatch(updateCar({ index: params?.index, ...data }));
    } else dispatch(addCar(data));
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={"handled"}
    >
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, invalid },
        }) => (
          <View style={styles.input}>
            <TextInput
              label="Color"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
        name="color"
        rules={{ required: "Color is a required field" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, invalid },
        }) => (
          <View style={styles.input}>
            <TextInput
              label="Make"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
        name="make"
        rules={{ required: "Make is a required field" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, invalid },
        }) => (
          <View style={styles.input}>
            <TextInput
              label="Model"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
        name="model"
        rules={{ required: "Model is a required field" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, invalid },
        }) => (
          <>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Pressable onPress={openMenu} style={styles.input}>
                  <TextInput
                    label="Category"
                    mode="outlined"
                    onBlur={onBlur}
                    editable={false}
                    onPressIn={openMenu}
                    value={value}
                    error={invalid}
                    right={
                      <TextInput.Icon
                        onPress={openMenu}
                        icon={() => <AntDesign name="caretdown" />}
                      />
                    }
                  />
                </Pressable>
              }
            >
              {[
                { value: "sedan", label: "Sedan" },
                { value: "suv", label: "SUV" },
                { value: "hatchback", label: "Hatchback" },
              ]?.map(({ label, value }) => (
                <Menu.Item
                  key={value}
                  onPress={() => {
                    setValue("category", value);
                    closeMenu();
                  }}
                  title={label}
                />
              ))}
            </Menu>
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
        name="category"
        rules={{ required: "Category is a required field" }}
        defaultValue=""
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 16,
  },
});

export default AddEditCar;
