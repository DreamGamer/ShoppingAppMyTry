import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import OrdersScreen from "../screens/orders/OrdersScreen";


const ShopNavigator = createStackNavigator({
    ordersScreen: {
        screen: OrdersScreen,
    }
});

export default ShopNavigator;