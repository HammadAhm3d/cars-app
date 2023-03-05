import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}
type RegisterProps = StackScreenProps<RootStackParamList, "Register">;

const Register = ({ navigation }: RegisterProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, invalid },
        }) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              keyboardType="email-address"
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </>
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
          <>
            <TextInput
              label="Username"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={styles.input}
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
        name="username"
        rules={{ required: "Username is a required field" }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error, invalid },
        }) => (
          <>
            <TextInput
              label="Password"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              style={styles.input}
              error={invalid}
            />
            {invalid && (
              <HelperText type="error" visible={invalid}>
                {error?.message}
              </HelperText>
            )}
          </>
        )}
        name="password"
        rules={{
          required: "Password is a required field",
          minLength: 6,
          maxLength: 13,
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
    </View>
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
