import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import ManageProductsScreen from "../screens/products/ManageProductsScreen";
import AddProductScreen from "../screens/products/AddProductScreen";
import EditProductScreen from "../screens/products/EditProductScreen";
import DefaultValues from "../constants/DefaultValues";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";


const ProductsNavigation = createStackNavigator({
    manageProductsScreen: {
        screen: ManageProductsScreen,
    },
    addProduct: {
        screen: AddProductScreen,
    },
    editProduct: {
        screen: EditProductScreen,
    },
    productDetailsUser: {
        screen: ProductDetailsScreen,
    },

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

export default ProductsNavigation;