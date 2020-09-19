import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";

// IMPORT Navigations
import AuthNavigator from "./AuthNavigator";
import AppNavigation from "./AppNavigation";
import StartScreen from "../screens/StartScreen";


const MainNavigation = createSwitchNavigator({
    Start: {
        screen: StartScreen,
    },
    Auth: {
        screen: AuthNavigator,
    },
    Shop: {
        screen: AppNavigation,
    }
});


// EXPORT Default Navigation
export default createAppContainer(MainNavigation);