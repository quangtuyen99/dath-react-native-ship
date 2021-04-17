import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import axios from "axios";
import baseURL from "../../../assets/common/baseURL";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "../../../Shared/OrderCard";

import { apiKey, localHost } from "../../../Shared/Constants/constant";

import EasyButton from "../../../Shared/StyledComponents/EasyButton";
const AdPeding = (props) => {
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

  const handleShipping = async () => {
    let arrTimeWindow = [[0, 12]];
    let arrTimeMatrix = [];
    // Tạo mảng thời gian giới hạn của mỗi khách hàng
    orderList.map((item) => {
      let newArr = [];
      newArr.push(parseInt(item.timeStart) * 60);
      newArr.push(parseInt(item.timeEnd) * 60);
      arrTimeWindow.push(newArr);
    });

    for (let i = 0; i < orderList.length; i++) {
      let newArr = [];
      for (let j = 0; j < orderList.length; j++) {
        if (i == j) {
          newArr.push(0);
          continue;
        }

        await axios
          .get(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${orderList[i].latitude}, ${orderList[i].longitude}&destination=${orderList[j].latitude}, ${orderList[j].longitude}&key=${apiKey}`
          )
          .then((res) => {
            newArr.push(res.data.routes[0].legs[0].duration.value);
          })
          .catch((err) => console.log(err));
      }
      arrTimeMatrix.push(newArr);
    }

    getData(arrTimeMatrix, arrTimeWindow);
  };

  const getData = async (timeMatrix, timeWindow) => {
    await axios
      .get(`${localHost}coordinate`, {
        method: "GET",
        body: {
          time_matrix: timeMatrix,
          time_windows: timeWindow,
        },
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {orderList ? (
        <SafeAreaView style={{ flex: 1 }}>
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
                  shadowColor: "grey",
                  shadowOffset: { width: 1, height: 2 },
                  shadowRadius: 1,
                  shadowOpacity: 0.5,
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

          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <EasyButton
              secondary
              large
              onPress={() => {
                handleShipping();
              }}
            >
              <Text style={{ color: "white" }}>Giao hàng</Text>
            </EasyButton>
          </View>
        </SafeAreaView>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </View>
  );
};

export default AdPeding;
