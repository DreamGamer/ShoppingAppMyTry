import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import OrdersScreen from "../screens/orders/OrdersScreen";
import DefaultValues from "../constants/DefaultValues";


const ShopNavigator = createStackNavigator({
    ordersScreen: {
        screen: OrdersScreen,
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

export default ShopNavigator;