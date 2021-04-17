import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import Pending from "../Screens/User/Order/Pending";
import Shipping from "../Screens/User/Order/Shipping";
import Complete from "../Screens/User/Order/Complete";

const OrderNavigators = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Pending"
        component={Pending}
        options={{ tabBarLabel: "Đang xử lý" }}
      />
      <Tab.Screen
        name="Shipping"
        component={Shipping}
        options={{ tabBarLabel: "Đang vận chuyển" }}
      />
      <Tab.Screen
        name="Complete"
        component={Complete}
        options={{ tabBarLabel: "Hoàn thành" }}
      />
    </Tab.Navigator>
  );
};

export default OrderNavigators;
