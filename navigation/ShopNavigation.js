import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ShopItemsScreen from "../screens/shop/ShopItemsScreen";

const ShopNavigation = createStackNavigator({
    shopItems: {
        screen: ShopItemsScreen,
    },
    productDetails: {
        screen: ProductDetailsScreen,
    }

});

export default ShopNavigation;