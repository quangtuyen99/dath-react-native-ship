import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductContainer from '../Screens/Product/ProductContainer';
import SingleProduct from '../Screens/Product/SingleProduct';

const Stack = createStackNavigator()

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ProductContainer}
                options={{
                    headerShown: false,

                }}
            >

            </Stack.Screen>

            <Stack.Screen
                name="Single"
                component={SingleProduct}
                options={{
                    headerShown: false,

                }}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}


export default function HomeNavigator() {
    return <MyStack/>
}