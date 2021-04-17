import React, {useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Dimensions, Button, Modal } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton"
var { width, height } = Dimensions.get("window");

const ListItem = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (

        
        <View style={{marginBottom: 5}}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            underlayColor="#e8e8e8"
                            onPress={() => {
                                setModalVisible(false)
                            }}
                            style={{
                                alignSelf: 'flex-end',
                                position: 'absolute',
                                top: 5,
                                right: 10
                            }}
                        >
                            <Icon name="close" size={20} />
                        </TouchableOpacity>

                        <EasyButton
                            medium
                            primary
                            onPress={() => {
                                props.navigation.navigate("Product Form", {item: props})
                                setModalVisible(false)
                            }}
                        >
                            <Text style={{color: "white"}}>Edit</Text>
                        </EasyButton>

                        <EasyButton
                            danger
                            medium
                            onPress={() => [
                                props.delete(props._id)
                            , setModalVisible(false)]}
                        >
                            <Text style={{color: "white"}}>Delete</Text>
                        </EasyButton>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity 
                onPress={() => {
                    props.navigation.navigate("Single", {item: props})
                }}
                style={[styles.container, {
                    backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro"
                }]}
                onLongPress={() => setModalVisible(true)}
            >
                <Image
                    source={{
                        uri: props.image ? 
                            props.image :
                            "https://eshop-server.herokuapp.com/public/uploads/Bosch-BHN24L-1604698311860.png" 
                    }}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.item}>{props.brand}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.category.name}</Text>
                <Text style={styles.item}>${props.price}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: 'wrap',
        margin: 3,
        width: width/6
    }, 
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    }, 
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default ListItem
