import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ShoppingCart from "../screens/shop/ShoppingCart";
import DefaultValues from "../constants/DefaultValues";

const ShopNavigation = createStackNavigator({
    productsOverviewScreen: {
        screen: ProductsOverviewScreen,
    },
    productDetailsShop: {
        screen: ProductDetailsScreen,
    },
    shoppingCart: {
        screen: ShoppingCart,
    }
}, {
    defaultNavigationOptions:{
        headerTitleStyle: {
            fontFamily: DefaultValues.fontBold,
        },
        headerBackTitleStyle: {
            fontFamily: DefaultValues.fontBold,
        }
    }
});

export default ShopNavigation;