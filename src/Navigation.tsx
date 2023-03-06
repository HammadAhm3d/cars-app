import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "./redux";
import { logout } from "./redux/slices/auth";
import AddEditCar from "./screens/AddEditCar";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerRight: () => (
                  <Button icon={"logout"} onPress={() => dispatch(logout())}>
                    Logout
                  </Button>
                ),
              }}
            />
            <Stack.Screen
              name="AddEditCar"
              component={AddEditCar}
              options={(props) =>
                props?.route?.params?.index
                  ? { title: "Edit car" }
                  : { title: "Add a car" }
              }
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
