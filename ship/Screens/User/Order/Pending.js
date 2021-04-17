import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import OrderCard from "../../../Shared/OrderCard";

import { empty } from "../../../Shared/Constants/icons";

import global from "../../../Shared/Constants/global";

const Pending = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pendingOrder = global.orders.filter((order) => order.status === "3");

    setOrders(pendingOrder);
    setLoading(false);
    return () => {
      setOrders([]);
    };
  }, []);
  return (
    <>
      {loading == false ? (
        <ScrollView>
          {orders.length != 0 ? (
            orders.map((item) => {
              return (
                <OrderCard
                  {...item}
                  key={item._id}
                  navigation={props.navigation}
                />
              );
            })
          ) : (
            <View style={styles.empty}>
              <Image source={empty} />
              <Text>Chưa có đơn hàng</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <ActivityIndicator color="black" size="large" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 40,
  },
});

export default Pending;
