import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import OrdersScreen from "../screens/orders/OrdersScreen";


const ProductsNavigation = createStackNavigator({
    orders: {
        screen: OrdersScreen,
    }
});

export default ProductsNavigation;