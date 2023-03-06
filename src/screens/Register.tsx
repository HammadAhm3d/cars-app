import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useAppDispatch } from "../redux";
import { register } from "../redux/slices/auth";
import { RootStackParamList } from "../types";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}
type RegisterProps = StackScreenProps<RootStackParamList, "Register">;

const Register = ({ navigation }: RegisterProps) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, getValues } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    const { email, password } = data;
    dispatch(register({ email, password }));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={"never"}
    >
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, invalid },
        }) => (
          <View style={styles.input}>
            <TextInput
              label="Email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
        name="email"
        rules={{ required: "Invalid email address", pattern: /^\S+@\S+$/i }}
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
              label="Password"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </View>
        )}
        name="password"
        rules={{
          required: "Password is a required field",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { invalid },
        }) => (
          <View style={styles.input}>
            <TextInput
              label="Confirm password"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                Passwords do not match
              </HelperText>
            )}
          </View>
        )}
        name="confirmPassword"
        rules={{
          required: "Confirm Password is a required field",
          validate: (value) =>
            value === getValues("password") || "The passwords do not match",
        }}
        defaultValue=""
      />
      <View style={styles.row}>
        <Text>Already have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate("Login")}>
          Sign in here
        </Button>
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Register
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;
