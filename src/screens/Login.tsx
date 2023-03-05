import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";

interface LoginFormData {
  username: string;
  password: string;
}
type LoginProps = StackScreenProps<RootStackParamList, "Login">;
const Login = ({ navigation }: LoginProps) => {
  const { control, handleSubmit } = useForm<LoginFormData>();
  const onSubmit = (data: LoginFormData) => {
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
        rules={{ required: "Username is required" }}
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
        rules={{ required: "Password is required" }}
        defaultValue=""
      />
      <View style={styles.row}>
        <Text>Don't have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate("Register")}>
          Sign up here
        </Button>
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Login
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 16,
  },
});

export default Login;
