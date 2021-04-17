import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import * as LocationUser from "expo-location";

import { apiKey } from "../../../Shared/Constants/constant";

import { truck } from "../../../Shared/Constants/icons";
Geocoder.init(apiKey);

const Location = (props) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [destination, setDestination] = useState(); // Dia diem nhap vao text input
  const [predictions, setPredictions] = useState([]); // Du doan
  const [latUser, setLatUser] = useState();
  const [longUser, setLongUser] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await LocationUser.requestPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let location = await LocationUser.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLoading(false);
    })();

    return () => {
      setError();
      setAddress();
      setLatitude();
      setLongitude();
      setLoading(true);
      setDestination();
      setPredictions([]);
    };
  }, []);

  // Xử lý các ký tự khi nhập vài và trả về chuỗi predictions
  async function onChangeDestination(text) {
    setDestination(text);
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${destination}&location=${latitude},${longitude}&radius=100`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      setPredictions(json.predictions);
    } catch (err) {
      console.log("aa");
      console.log(err);
    }
  }

  // Lấy dữ liệu (lat, long) từ địa điểm được chọn và hiển thị lên màn hình
  async function getDetailById(text) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${text}`;
    try {
      setAddress();
      const result = await fetch(apiUrl);
      const json = await result.json();
      setLatUser(json.result.geometry.location.lat);
      setLongUser(json.result.geometry.location.lng);
      setLatitude(json.result.geometry.location.lat);
      setLongitude(json.result.geometry.location.lng);
      setDestination(""); // Clear thanh tìm kiếm
    } catch (err) {
      console.log(err);
    }
  }

  const prediction = predictions.map((predict) => (
    <TouchableOpacity
      key={predict.place_id}
      onPress={() => {
        getDetailById(predict.place_id);
      }}
    >
      <Text style={styles.suggest}>{predict.description}</Text>
    </TouchableOpacity>
  ));

  return (
    <>
      {loading == false ? (
        <View style={styles.container}>
          <MapView
            showsUserLocation
            showsMyLocationButton={false}
            style={styles.map}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            {latUser != undefined && longUser != undefined ? (
              <Marker
                coordinate={{
                  latitude: latUser,
                  longitude: longUser,
                }}
              />
            ) : null}
          </MapView>
          <TextInput
            style={styles.search}
            placeholder="Viet Nam?"
            value={destination}
            onChangeText={(text) => onChangeDestination(text)}
          />
          {destination != "" ? prediction : null}

          <TouchableOpacity
            style={styles.icon}
            onPress={async () => {
              // Lay dia chi
              const response = await Geocoder.from(latitude, longitude);
              const address1 = response.results[0].formatted_address;
              setAddress(address1.substring(0, address1.indexOf(", Vietnam")));
              if (address != null) {
                let cordinate = {
                  latitude,
                  longitude,
                  address,
                };
                props.navigation.navigate("Shipping", {
                  cordinate,
                });
              }
            }}
          >
            <Image source={truck} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    height: 40,
    padding: 10,
    backgroundColor: "white",
    marginTop: 30,
    borderWidth: 0.5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  suggest: {
    backgroundColor: "white",
    padding: 5,
    borderWidth: 0.5,
    marginHorizontal: 10,
  },
  icon: {
    position: "absolute",
    bottom: 10,
    right: 5,
  },
});

export default Location;
