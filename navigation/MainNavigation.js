import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

// IMPORT Navigations
import ShopNavigation from "./ShopNavigation";
import OrdersNavigation from "./OrdersNavigaton";
import ProductsNavigation from "./ProductsNavigation";


const MainNavigation = createDrawerNavigator({
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
});


// EXPORT Default Navigation
export default createAppContainer(MainNavigation);