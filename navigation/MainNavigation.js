import { createAppContainer } from "react-navigation";
import { createSwitchNavigator } from "react-navigation";

// IMPORT Navigations
import AuthNavigator from "./AuthNavigator";
import AppNavigation from "./AppNavigation";


const MainNavigation = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator,
    },
    Shop: {
        screen: AppNavigation,
    }
});


// EXPORT Default Navigation
export default createAppContainer(MainNavigation);