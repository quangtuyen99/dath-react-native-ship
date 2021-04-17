import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Checkout from "../Screens/Cart/Checkout/Checkout";
import Payment from "../Screens/Cart/Checkout/Payment";
import Confirm from "../Screens/Cart/Checkout/Confirm";
import Location from "../Screens/Cart/Checkout/Location";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="Shipping" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs></MyTabs>;
}
