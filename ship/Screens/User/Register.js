import React, {useState} from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import EasyButton from "../../Shared/StyledComponents/EasyButton"

import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import Error from '../../Shared/Error'

import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'


import axios from 'axios'
import baseURL from '../../assets/common/baseURL';

const Register = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [repassword, setRepassword] = useState("");

    const register = () => {
        let user ={
            email,
            password,
            phone,
            name,
            isAdmin: false
        }

        if(email === "" || password === "" || phone === "" || name === "") {
            setError("You must fill full credentials")
        } else {
            console.log("success")
        }

        axios.post(`${baseURL}users/register`, user)
        .then((res) => {
            if(res.status == 200) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Success!",
                    text2: "Please Login"
                })

                setTimeout(() => {
                    props.navigation.navigate("Login")
                }, 500)
            }
        })
        .catch((err) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Somethong went wrong",
                text2: "Please try again"
            });
        });
    }

    return (
        <KeyboardAwareScrollView
            viewInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}

        >
            <FormContainer
                title="Register"
            >
                <Input
                    placeholder="Enter email"
                    name="email"
                    id="email"
                    value={email}
                    autoCorrect={false}
                    onChangeText={(text) => setEmail(text.toLowerCase())}

                />

                <Input
                    placeholder="Enter password"
                    name="password"
                    id="password"
                    value={password}
                    autoCorrect={false}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}

                />

                <Input
                    placeholder="Re Enter password"
                    name="repassword"
                    id="repassword"
                    value={repassword}
                    autoCorrect={false}
                    onChangeText={(text) => setRepassword(text)}
                    secureTextEntry={true}

                />

                <Input
                    placeholder="Enter name"
                    name="name"
                    id="name"
                    value={name}
                    autoCorrect={false}
                    onChangeText={(text) => setName(text.toLowerCase())}

                />

                <Input
                    placeholder="Enter phone"
                    name="phone"
                    id="phone"
                    value={phone}
                    autoCorrect={false}
                    onChangeText={(text) => setPhone(text)}
                    keyboradType={"numeric"}
                />

                <View style={styles.buttonGroup}>
                    {error ? <Error message={error}/> : null}
                </View>

                <View style={styles.buttonGroup}>
                    <EasyButton 
                        primary
                        large
                        onPress={() => register()}    
                    >
                        <Text style={{color: "white"}}>Register</Text>
                    </EasyButton>
                </View>

                <View >
                    <EasyButton 
                        secondary
                        large
                        onPress={() => {props.navigation.navigate("Login")}}    
                    >
                        <Text style={{color: "white"}}>Back to Login</Text>
                    </EasyButton>
                </View>

            </FormContainer>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        width: '80%',
        alignItems: 'center',
        margin: 10
    },
})

export default Register
