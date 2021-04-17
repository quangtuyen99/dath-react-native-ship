import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";
import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import * as actions from "../../Redux/Actions/cartActions";

// styled-components
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item); // Product
  const [availability, setAvailability] = useState(null); // Count
  const [categories, setCategories] = useState();
  const [availabilityText, setAvailabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    };
  }, []);

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: item.image
                ? item.image
                : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
            }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <H1 style={styles.textHeader}>{item.name}</H1>
          <Text style={styles.brand}>{item.brand}</Text>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>

            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>$ {item.price}</Text>
        </Left>

        <Right style={{ marginRight: 20 }}>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addToCart(props.route.params.item),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to Cart`,
                  text2: "Complete Order",
                });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </Right>
      </View>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    margin: 0,
    padding: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  textHeader: {
    fontWeight: "bold",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  des: {
    padding: 5,
    fontSize: 14,
    alignSelf: "flex-start",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
