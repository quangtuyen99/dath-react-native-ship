import React, { useState, useCallback } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Container, Header, Icon, Item, Input, Text } from "native-base";

// component
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

import { useFocusEffect } from "@react-navigation/native";

import baseURL from "../../assets/common/baseURL";
import axios from "axios";

const ProductContainer = (props) => {
  const [product, setProduct] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [focus, setFocus] = useState(false);
  const [text, setText] = useState("");
  const [categories, setCategories] = useState([]);
  const [activate, setActivate] = useState();
  const [initialState, setInitialState] = useState([]);
  const [productCtg, setProductCtg] = useState([]); // Product by Category
  const [loading, setLoading] = useState(true); // use when product loads from server

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActivate(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProduct(res.data);
          setProductFilter(res.data);
          setInitialState(res.data);
          setProductCtg(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error");
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.log("error");
        });

      return () => {
        setProduct([]);
        setProductFilter([]);
        setFocus();
        setCategories([]);
        setActivate();
        setInitialState([]);
      };
    }, [])
  );

  const searchProduct = (text) => {
    setProductFilter(
      product.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductCtg(initialState), setActivate(true)]
        : [
            setProductCtg(product.filter((i) => i.category._id === ctg)),
            setActivate(true),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={(text) => {
                  searchProduct(text);
                }}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name="ios-close" />
              ) : null}
            </Item>
          </Header>
          {/* Search Product */}
          {focus == true ? (
            <SearchedProduct
              productFilter={productFilter}
              navigation={props.navigation}
            />
          ) : (
            <ScrollView
              style={{ backgroundColor: "gainsboro", paddingBottom: 50 }}
              key={product._id}
            >
              <Banner />
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productCtg={productCtg}
                activate={activate}
                setActivate={setActivate}
              />
              {productCtg.length > 0 ? (
                <View style={styles.listContainer}>
                  {productCtg.map((item) => {
                    return (
                      <ProductList
                        navigation={props.navigation}
                        key={item._id}
                        item={item}
                      />
                    );
                  })}
                </View>
              ) : (
                <View style={[styles.center, { height: "40%" }]}>
                  <Text> No Product </Text>
                </View>
              )}
            </ScrollView>
          )}
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  activate: {
    backgroundColor: "#03bafc",
  },
  inactivate: {
    backgroundColor: "#a0e1eb",
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
});

export default ProductContainer;
