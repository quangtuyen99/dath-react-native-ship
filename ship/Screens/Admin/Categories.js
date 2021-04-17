import React, { useEffect, useState } from 'react'
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet
} from 'react-native'

import EasyButton from "../../Shared/StyledComponents/EasyButton";

//API
import baseURL from "../../assets/common/baseURL";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

var { width, height } = Dimensions.get("window");

const Item = (props) => {
    return(
        <View 
            style={styles.item}
        >
            <Text>{props.item.name}</Text>
            <EasyButton
                danger
                medium
                onPress = {() => props.delete(props.item._id)}
            >
                <Text style={{color: "white"}}>Delete</Text>
            </EasyButton>
        </View>
    )
}


const Categories = (props) => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        //Token: 
        AsyncStorage
            .getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((err) => {
                console.log(err)
            });

        //Categories
        axios
            .get(`${baseURL}categories`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                console.log(err)
            });

        return() => {
            setCategories([])
        }
    }, [])

    
    
    // Add category
    const AddCategory = () => {
        const category = {
            name: categoryName
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        //Categories
        axios
            .post(`${baseURL}categories`, category, config)
            .then((res) => {
                setCategories([...categories, res.data])
            })
            .catch((err) => {
                console.log(err)
            });

        setCategoryName("")
    }

    const deleteCategories = (id) => {
        //Categories
        axios
            .delete(`${baseURL}categories/${id}`,{
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res) => {
                const newCategory = categories.filter((item) => 
                    item._id !== id
                );
                setCategories(newCategory)
            })
            .catch((err) => {
                console.log(err)
            });
    }


    return (
        
        <View style={styles.container}>

            <View style={styles.subContainer}>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item._id}
                    renderItem={({item, index}) => (
                        <Item item={item} index={index} delete={deleteCategories}/>
                    )}
                />
            </View>

            <View style={styles.bottomBar}>
                <View style={{marginLeft: 5}}>
                    <Text>Add category</Text>
                </View>
                <View style={{width: width / 2.5}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Category name"
                        value={categoryName}
                        onChangeText={(text) => setCategoryName(text)}
                    />
                </View>
                <View>
                    <EasyButton
                        primary
                        medium
                        onPress={() => AddCategory()}
                    >
                        <Text style>Confirm</Text>
                    </EasyButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        height: "100%",
        
    },
    subContainer: {
        marginBottom: 60,

    },
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 2,
        padding: 10
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 10,
        margin: 10,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5,
        
    }
})

export default Categories
