import React from "react";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";
var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item } = props;

  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() => props.navigation.navigate("Single", { item })}
    >
      <View
        style={{
          width: width / 2,
        }}
      >
        <ProductCard {...item} key={item.id} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
