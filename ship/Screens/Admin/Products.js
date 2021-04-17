import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Header, Item, Input } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItem from "./ListItem";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View style={styles.containerHeader} elevation={1}>
      <View style={styles.header}></View>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold" }}>Brand</Text>
      </View>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
      </View>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold" }}>Category</Text>
      </View>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold" }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // Get all products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProductList(res.data);
          setLoading(false);
          setProductFilter(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        setProductFilter();
        setProductList();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }

    setProductFilter(
      productList.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => {
          item.id !== id;
        });

        setProductFilter(products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => {
            props.navigation.navigate("AdminOrderNavigators");
          }}
        >
          <Icon name="shopping-bag" size={18} color="white" />
          <Text style={styles.buttonText}>Order</Text>
        </EasyButton>

        <EasyButton
          secondary
          medium
          onPress={() => {
            props.navigation.navigate("Product Form");
          }}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Product</Text>
        </EasyButton>

        <EasyButton
          secondary
          medium
          onPress={() => {
            props.navigation.navigate("Categories");
          }}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton>
      </View>

      <View>
        <Header searchBar rounded>
          <Item style={{ padding: 10 }}>
            <Icon name="search" />
            <Input
              placeholder="Search"
              onChangeText={(text) => {
                searchProduct(text);
              }}
            />
          </Item>
        </Header>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={ListHeader}
          data={productFilter}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
            />
          )}
          key={(item, index) => item._id}
          keyExtractor={(item, index) => item.key}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  header: {
    margin: 3,
    width: width / 6,
  },
  containerHeader: {
    flexDirection: "row",
    width: width,
    padding: 5,
    backgroundColor: "gainsboro",
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    margin: 20,
    alignSelf: "center",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Products;
