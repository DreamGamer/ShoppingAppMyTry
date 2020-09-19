import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems, DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { View, SafeAreaView, Button, StyleSheet } from "react-native";

// IMPORT Navigations
import ShopNavigation from "./ShopNavigation";
import OrdersNavigation from "./OrdersNavigaton";
import ProductsNavigation from "./ProductsNavigation";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";


const AppNavigation = createDrawerNavigator({
    shop: {
        screen: ShopNavigation,
        navigationOptions: {
            drawerLabel: "Shop",
            drawerIcon: drawerConfig => (
                <Ionicons name="ios-cart" size={23} color={drawerConfig.tintColor} />
            ),
        }
    },
    orders: {
        screen: OrdersNavigation,
        navigationOptions: {
            drawerLabel: "Orders",
            drawerIcon: drawerConfig => (
                <Ionicons name="ios-list" size={23} color={drawerConfig.tintColor} />
            ),
        }
    },
    products: {
        screen: ProductsNavigation,
        navigationOptions: {
            drawerLabel: "Products",
            drawerIcon: drawerConfig => (
                <Ionicons name="ios-create" size={23} color={drawerConfig.tintColor} />
            ),
        }
    }
}, {
    contentComponent: props => {
        const dispatch = useDispatch();

        return (
            <View style={styles.content}>
                <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                    <DrawerNavigatorItems {...props} />
                    <Button title="Logout" onPress={() => {
                        dispatch(authActions.logout());
                        props.navigation.navigate("Auth");
                    }} />
                </SafeAreaView>
            </View>
        )
    }
});

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: 35
    }
});


// EXPORT Default Navigation
export default AppNavigation;