import { AntDesign } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useAppSelector } from "../redux";
import { Car } from "../redux/slices/cars";
import { RootStackParamList } from "../types";

type DashboardProps = StackScreenProps<RootStackParamList, "Dashboard">;
const Dashboard = ({ navigation }: DashboardProps) => {
  const { cars } = useAppSelector((state) => state.cars);
  const { email } = useAppSelector((state) => state.auth);
  useEffect(() => navigation.setOptions({ title: email }), []);
  const renderCarItem = useCallback(
    ({ item, index }: { item: Car; index: number }) => {
      return (
        <View style={[styles.row, styles.between]}>
          <Text variant="titleMedium">
            {item.make} - {item.model}
          </Text>
          <IconButton
            icon={() => <AntDesign name="edit" size={24} color="black" />}
            onPress={() =>
              navigation.navigate("AddEditCar", { index, ...item })
            }
          />
        </View>
      );
    },
    []
  );
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.titleText}>
        Registered cars: {cars?.length}
      </Text>
      <FlatList
        data={cars}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderCarItem}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("AddEditCar")}
      >
        Add a car
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
  titleText: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  between: {
    justifyContent: "space-between",
  },
});

export default Dashboard;
