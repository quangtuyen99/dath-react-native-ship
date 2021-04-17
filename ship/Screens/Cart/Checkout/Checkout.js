import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { connect } from "react-redux";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";

import { LinearGradient } from "expo-linear-gradient";

const Checkout = (props) => {
  const cordinate = props.route.params;
  const context = useContext(AuthGlobal);
  const [orderItems, setOrderItems] = useState();
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState();

  //Time picker Start
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // Time picker End
  const [modeEnd, setModeEnd] = useState("date");
  const [showEnd, setShowEnd] = useState(false);

  //Time start and end
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to check",
        text2: "",
      });
    }

    return () => {
      setOrderItems();
      setTimeStart();
      setTimeEnd();
    };
  }, []);

  const checkOut = () => {
    var piecesStart = timeStart.split(":");
    let minStart = parseInt(piecesStart[1]);
    let hourStart = parseInt(piecesStart[0]);

    var piecesEnd = timeEnd.split(":");
    let minEnd = parseInt(piecesEnd[1]);
    let hourEnd = parseInt(piecesEnd[0]);

    if (phone == "" || timeEnd == "" || timeStart == "") {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please fill full",
      });
    } else {
      if (hourStart > hourEnd) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Time is invalid",
        });
      } else if (hourStart == hourEnd) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Time is invalid",
        });
      } else {
        let order = {
          dateOrder: Date.now(),
          orderItems,
          phone,
          status: "3",
          user,
          address: cordinate.cordinate.address,
          latitude: cordinate.cordinate.latitude,
          longitude: cordinate.cordinate.longitude,
          timeStart: timeStart,
          timeEnd: timeEnd,
        };

        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Success",
        });

        props.navigation.navigate("Payment", { order });
      }
    }
  };

  //Time picker start

  const showTimepicker = () => {
    showMode("time");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    let newDate = new Date(currentDate);
    let hour, min;
    if (newDate.getHours() < 10) {
      hour = "0" + newDate.getHours();
    } else {
      hour = newDate.getHours();
    }

    if (newDate.getMinutes() < 10) {
      min = "0" + newDate.getMinutes();
    } else {
      min = newDate.getMinutes();
    }

    setTimeStart(hour + ":" + min);
  };

  // Time picker end

  const showTimepickerEnd = () => {
    showModeEnd("time");
  };

  const showModeEnd = (currentMode) => {
    setShowEnd(true);
    setModeEnd(currentMode);
  };

  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEnd(Platform.OS === "ios");
    let newDate = new Date(currentDate);
    let hour, min;
    if (newDate.getHours() < 10) {
      hour = "0" + newDate.getHours();
    } else {
      hour = newDate.getHours();
    }

    if (newDate.getMinutes() < 10) {
      min = "0" + newDate.getMinutes();
    } else {
      min = newDate.getMinutes();
    }

    setTimeEnd(hour + ":" + min);
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      // extraHeight={100}
      enableOnAndroid={true}
    >
      <FormContainer title="Shipping Adress">
        <Input
          placeholder={"Phone"}
          name={"phone"}
          id="phone"
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />

        <View style={styles.textInput}>
          <Text style={{ flex: 1 }}>
            {cordinate ? cordinate.cordinate.address : ""}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-around",
            display: "flex",
            width: "100%",
          }}
        >
          <LinearGradient
            colors={["#a1c4fd", "#c2e9fb"]}
            start={{ y: 0.0, x: 0.0 }}
            end={{ y: 0.0, x: 1.0 }}
            style={styles.buttonTime}
          >
            <TouchableOpacity onPress={showTimepicker}>
              <Text style={styles.txtTime}>
                {timeStart ? timeStart : "Show time start"}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>-</Text>
          </View>

          <LinearGradient
            colors={["#a1c4fd", "#c2e9fb"]}
            start={{ y: 0.0, x: 0.0 }}
            end={{ y: 0.0, x: 1.0 }}
            style={styles.buttonTime}
          >
            <TouchableOpacity onPress={showTimepickerEnd}>
              <Text style={styles.txtTime}>
                {timeEnd ? timeEnd : "Show time end"}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        )}

        {showEnd && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={modeEnd}
            is24Hour={false}
            display="default"
            onChange={onChangeEnd}
          />
        )}

        <View style={{ width: "80%", alignItems: "center", borderRadius: 10 }}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    width: "80%",
    borderWidth: 2,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    borderColor: "orange",
  },
  buttonTime: {
    padding: 10,

    borderRadius: 10,
    width: 115,
    alignItems: "center",
    justifyContent: "center",
  },
  txtTime: {
    fontSize: 13,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
