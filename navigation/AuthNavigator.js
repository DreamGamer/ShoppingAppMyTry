import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import AuthScreen from "../screens/user/AuthScreen";
import DefaultValues from "../constants/DefaultValues";
import AppNavigation from "./AppNavigation";

const ShopNavigation = createStackNavigator({
    authScreen: {
        screen: AuthScreen,
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