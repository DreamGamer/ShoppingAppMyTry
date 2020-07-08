import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import ManageProductsScreen from "../screens/products/ManageProductsScreen";
import AddProduct from "../screens/products/AddProduct";


const ShopNavigator = createStackNavigator({
    manageProductsScreen: {
        screen: ManageProductsScreen,
    },
    addProduct: {
        screen: AddProduct
    }

});

export default ShopNavigator;