import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import AdPending from "../Screens/Admin/Order/AdPending";
import AdShipping from "../Screens/Admin/Order/AdShipping";
import AdComplete from "../Screens/Admin/Order/AdComplete";

const OrderNavigators = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AdPending"
        component={AdPending}
        options={{ tabBarLabel: "Đang xử lý" }}
      />
      <Tab.Screen
        name="AdShipping"
        component={AdShipping}
        options={{ tabBarLabel: "Đang vận chuyển" }}
      />
      <Tab.Screen
        name="AdComplete"
        component={AdComplete}
        options={{ tabBarLabel: "Hoàn thành" }}
      />
    </Tab.Navigator>
  );
};

export default OrderNavigators;
