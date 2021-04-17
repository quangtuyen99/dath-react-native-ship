import React, { useState, useCallback } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../Shared/OrderCard";

const Order = (props) => {
  const [orderList, setOrderList] = useState();
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrderList();
      };
    }, [])
  );

  const getOrders = () => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`${baseURL}orders`)
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {orderList ? (
        <View>
          <FlatList
            data={orderList}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    #{item._id}
                  </Text>
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text>Địa chỉ: {item.address}</Text>
                </View>
                <Text>
                  Thời gian: {item.timeStart} - {item.timeEnd}
                </Text>
                <View style={{ alignSelf: "flex-end" }}>
                  <Text style={{ color: "red" }}>{item.totalPrice} VND</Text>
                </View>
              </View>
            )}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </View>
  );
};

export default Order;
