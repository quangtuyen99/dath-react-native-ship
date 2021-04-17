import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";
import ChangeInfo from "../Screens/User/ChangeInfo";
import OrderNavigators from "../Navigators/OrderNavigators";
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="ChangeInfo"
        component={ChangeInfo}
        options={{
          headerShown: true,
          title: "Thay đổi thông tin",
        }}
      ></Stack.Screen>

      <Stack.Screen
        name="OrderNavigators"
        component={OrderNavigators}
        options={{
          headerShown: true,
          title: "Thông tin đơn hàng",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
