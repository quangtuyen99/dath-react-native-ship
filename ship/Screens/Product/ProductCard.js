import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from "react-native";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import * as actions from "../../Redux/Actions/cartActions";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>

      {countInStock > 0 ? (
        <View style={{ marginBottom: 20, borderRadius: 5, marginTop: 20 }}>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addToCart(props),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${name} added to Cart`,
                  text2: "Complete Order",
                });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>No Available</Text>
      )}
    </View>
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
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 60,
    height: width / 2 - 20 - 50,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 120,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
