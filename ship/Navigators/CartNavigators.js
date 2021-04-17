import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Cart from "../Screens/Cart/Cart";
import CheckoutNavigator from "./CheckoutNavigator";
import Login from "../Screens/User/Login";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: "Checkout",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
