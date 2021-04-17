import React, { useState, useEffect, } from 'react'
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    ScrollView,
    Alert
} from 'react-native'

import {
    Item,
    Picker
} from "native-base"

import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";

import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import Error from "../../Shared/Error";

import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import mime from "mime"; // hadle image uri

import * as ImagePicker from "expo-image-picker";


const ProductForm = (props) => {
    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(5);
    const [isFeatured, setIsFeatured] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    useEffect(() => {
        // Check if item exist
        if(!props.route.params) {
            setItem(null);
        } else {
            setItem(props.route.params.item)
            setBrand(props.route.params.item.brand)
            setName(props.route.params.item.name)
            setPrice(props.route.params.item.price.toString())
            setDescription(props.route.params.item.description)
            setMainImage(props.route.params.item.image)
            setImage(props.route.params.item.image)
            setCategory(props.route.params.item.category._id)
            setCountInStock(props.route.params.item.countInStock.toString());
        }

        console.log(item);
        //Categories
        axios
            .get(`${baseURL}categories`)
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                console.log(err)
            });

        //Image Picker
        (async () => {
            if(Platform.OS !== "web") {
                const {
                    status
                } = await ImagePicker.requestCameraPermissionsAsync();

                if(status != "granted") {
                    Alert.alert("Sorry, we need camera")
                }  
            }

                      
        })();

        AsyncStorage
            .getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((err) => {
                console.log(err);
            })
        return() => {
            setCategories([])
        }
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if(!result.cancelled) {
            setMainImage(result.uri);
            setImage(result.uri);
        }
    }

    const addProduct = () => {
        if(
            name == "" ||
            brand == "" ||
            price == "" ||
            countInStock == "" ||
            description == ""
        ) {
            Toast.show({
                type: "error",
                text1: "Invalid information",
                text2: "",
                topOffset: 60
            })
        } 

        let formData = new FormData();

        //handle error IOS
        const newImageUri = "file:///" + image.split("file:/").join("");

        formData.append("image", {
            uri: newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop() // because image is uri
        });
        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        

        if(item !== null) {
            console.log(`${baseURL}products/${item._id}`)
            axios
                .put(`${baseURL}products/${item._id}`, formData, config)
                .then((res) => {
                    if(res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Product successfuly updated",
                            text2: ""
                        });
                        setTimeout(() => {
                            props.navigation.navigate("Products");
                        }, 500)
                    }
                })
                .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                            type: "error",
                            text1: "Something went wrong",
                            text2: "Please try again"
                    })
                    console.log(error);
                })
        } else {
            axios
                .post(`${baseURL}products`, formData, config)
                .then((res) => {
                    if(res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "New product added",
                            text2: ""
                        });

                        setTimeout(() => {
                            props.navigation.navigate("Products")
                        }, 500)
                    }
                })
                .catch((err) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Something wrong",
                        text2: "Please try again"
                    })
                    console.log(err)
                })
        }

        
    }

    return (
        <ScrollView>
            <FormContainer
                title="Add product"
            >
                {/* Image */}
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image}
                        source={{uri : mainImage}}
                    />
                    <TouchableOpacity 
                        style={styles.imagePicker}
                        onPress={() => {pickImage()}}    
                    >
                        <Icon style={{ color: "white"}} name="camera"/>
                    </TouchableOpacity>
                </View>
                
                {/* Brand */}
                <View style={styles.label}>
                    <Text style={{textDecorationLine: "underline"}}>Brand</Text>
                </View>
                <Input
                    placeholder="Brand"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChangeText={(text) => setBrand(text)}
                />

                {/* Name */}
                <View style={styles.label}>
                    <Text style={{textDecorationLine: "underline"}}>Name</Text>
                </View>
                <Input
                    placeholder="Name"
                    name="name"
                    id="name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                {/* Price */}
                <View style={styles.label}>
                    <Text style={{textDecorationLine: "underline"}}>Price</Text>
                </View>
                <Input
                    placeholder="Price"
                    name="price"
                    id="price"
                    value={price}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPrice(text)}
                />

                {/* CountInStock */}
                <View style={styles.label}>
                    <Text style={{textDecorationLine: "underline"}}>Count In Stock</Text>
                </View>
                <Input
                    placeholder="CountInStock"
                    name="countInStock"
                    id="countInStock"
                    keyboardType={"numeric"}
                    value={countInStock}
                    onChangeText={(text) => setCountInStock(text)}
                />

                {/* Description */}
                <View style={styles.label}>
                    <Text style={{textDecorationLine: "underline"}}>Description</Text>
                </View>
                <Input
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />

                {/* Category */}
                <Item picker > 
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon color="#007aff" name="arrow-down"/>}
                        style={{width: undefined}}
                        placeholder="Select Category"
                        selectedValue={pickerValue}
                        placeholderStyle={{color: "#007aff"}}
                        placeholderIconColor={{color: "#007aff"}}
                        onValueChange={(e) => [
                            setPickerValue(e),
                            setCategory(e),
                            console.log(`category ${e}`)
                        ]}
                    >
                        {categories.map((c) => {
                            return(
                                <Picker.Item
                                    key={c._id}
                                    label={c.name}
                                    value={c._id}
                                />
                            )
                        })}
                    </Picker>
                </Item>

                {/* Check error is exist */}
                {err ? <Error message={err}/> : null}

                {/* Button */}
                <View style={styles.buttonContainer}>
                    <EasyButton
                        primary
                        large
                        onPress={() => addProduct()}
                    >
                        <Text style={{color: "white"}}>Confirm</Text>
                    </EasyButton>
                </View>
            </FormContainer>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginTop: 20,
        alignItems: "center"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#e0e0e0",

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "gray",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})

export default ProductForm
