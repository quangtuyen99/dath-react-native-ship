import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Location from "../Screens/Cart/Checkout/Location";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return <Tab.Navigator></Tab.Navigator>;
}

export default function MapNavigator() {
  return <MyTabs></MyTabs>;
}
