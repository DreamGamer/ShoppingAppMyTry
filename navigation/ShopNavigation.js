import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const ShopNavigation = createStackNavigator({
    shopItems: {
        screen: ProductsOverviewScreen,
    },
    productDetails: {
        screen: ProductDetailsScreen,
    }

});

export default ShopNavigation;