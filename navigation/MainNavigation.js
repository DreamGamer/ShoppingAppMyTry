import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

// IMPORT Navigations
import ShopNavigation from "./ShopNavigation";
import OrdersNavigation from "./OrdersNavigaton";
import ProductsNavigation from "./ProductsNavigation";


const MainNavigation = createDrawerNavigator({
    shop: {
        screen: ShopNavigation,
    },
    orders: {
        screen: OrdersNavigation,
    },
    products: {
        screen: ProductsNavigation
    }
});


// EXPORT Default Navigation
export default createAppContainer(MainNavigation);