import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { Container } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.action";
import { useEffect } from "react/cjs/react.development";
import OrderCard from "../../Shared/OrderCard";

import global from "../../Shared/Constants/global";

import { user, user1, exit, cart } from "../../Shared/Constants/icons";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      // Trigger when logout
      let isActivate = true;
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }

      if (isActivate) {
        AsyncStorage.getItem("jwt")
          .then((res) => {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => {
                setUserProfile(user.data), setLoading(false);
              });
          })
          .catch((error) => console.log(error));

        axios
          .get(`${baseURL}orders`)
          .then((res) => {
            const data = res.data;

            // Get order by user
            const userOrders = data.filter(
              (order) => order.user._id === context.stateUser.user.userId
            );
            global.orders = [];
            global.orders = userOrders;
          })
          .catch((err) => {
            console.log(err);
          });
      }

      return () => {
        setUserProfile();
        setOrders();
        setLoading(false);
        isActivate = false;
      };
    }, [context.stateUser.isAuthenticated])
  );

  return (
    <>
      {loading == false ? (
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={styles.subContainer}>
            <View
              style={{
                backgroundColor: "#80d4ff",
                width: "100%",
                height: 100,
                justifyContent: "center",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={user} />
              <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={{ fontSize: 30 }}>
                  {userProfile ? userProfile.name : "null"}
                </Text>
                <Text>{userProfile ? userProfile.email : ""}</Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={{ marginTop: 50, width: "100%" }}
                onPress={() =>
                  props.navigation.navigate("ChangeInfo", {
                    id: userProfile._id,
                    pass: userProfile.passwordHash,
                    name: userProfile.name,
                  })
                }
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: 50,
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={user1} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 16 }}>Thay đổi thông tin</Text>
                  </View>
                  <Text style={{ fontSize: 30, color: "gray" }}> &gt; </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 2, width: "100%" }}
                onPress={() => {
                  props.navigation.navigate("OrderNavigators");
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: 50,
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={cart} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 16 }}>Thông tin đơn hàng</Text>
                  </View>
                  <Text style={{ fontSize: 30, color: "gray" }}> &gt; </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 2, width: "100%" }}
                onPress={() => {
                  AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch);
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    height: 50,
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={exit} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ fontSize: 16 }}>Đăng xuất</Text>
                  </View>
                  <Text style={{ fontSize: 30, color: "gray" }}> &gt; </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Container>
      ) : (
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="black" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCDCDC",
  },
  subContainer: {
    alignItems: "center",
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    borderRadius: 50,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProfile;
