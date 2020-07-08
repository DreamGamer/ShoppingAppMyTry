import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import ShopItemsScreen from "../screens/ShopItemsScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";


const ShopNavigator = createStackNavigator({
    shopItems: {
        screen: ShopItemsScreen,
    },
    productDetails: {
        screen: ProductDetailsScreen,
    }

});

const MainNavigation = createDrawerNavigator({
    shop: {
        screen: ShopNavigator
    },
});



// EXPORT Default Navigation
export default createAppContainer(MainNavigation);