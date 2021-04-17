import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categories from "../Screens/Admin/Categories";
import Order from "../Screens/Admin/Order";
import ProductForm from "../Screens/Admin/ProductForm";
import Products from "../Screens/Admin/Products";
import AdminOrderNavigators from "../Navigators/AdminOrderNavigators";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          headerTitle: "Products",
          headerTitleStyle: { justifyContent: "center", alignSelf: "center" },
        }}
      />

      <Stack.Screen name="Categories" component={Categories} />

      <Stack.Screen
        name="AdminOrderNavigators"
        component={AdminOrderNavigators}
        options={{
          headerShown: true,
          title: "Quản lý đơn hàng",
        }}
      />

      <Stack.Screen name="Product Form" component={ProductForm} />
    </Stack.Navigator>
  );
}

export default function AdminNavigator() {
  return <MyStack />;
}
