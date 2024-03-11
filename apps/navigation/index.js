// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/

import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import FirstPage from '../pages/FirstPage';
import SecondPage from '../pages/SecondPage';
import ThirdPage from '../pages/ThirdPage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const FirstScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="FirstPage"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="FirstPage"
                component={FirstPage}
            />
        </Stack.Navigator>
    );
}

const SecondScreenStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SecondPage"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="SecondPage"
                component={SecondPage} />
            <Stack.Screen
                name="ThirdPage"
                component={ThirdPage} />
        </Stack.Navigator>
    );
}

function NavigationApp() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: '#c6cbef', //Set Drawer background
                        width: 250, //Set Drawer width
                    },
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    }
                }}>
                <Drawer.Screen
                    name="FirstHomePage"
                    options={{
                        drawerLabel: 'First page Option',
                        title: 'First Stack'
                    }}
                    component={FirstScreenStack} />
                <Drawer.Screen
                    name="SecondPage"
                    options={{
                        drawerLabel: 'Second page Option',
                        title: 'Second Stack'
                    }}
                    component={SecondScreenStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}


export default NavigationApp;