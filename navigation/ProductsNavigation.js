import { createStackNavigator } from "react-navigation-stack";

// SCREENS
import ManageProductsScreen from "../screens/products/ManageProductsScreen";
import AddProduct from "../screens/products/AddProduct";
import EditProduct from "../screens/products/EditProduct";


const ProductsNavigation = createStackNavigator({
    manageProductsScreen: {
        screen: ManageProductsScreen,
    },
    addProduct: {
        screen: AddProduct,
    },
    editProduct: EditProduct,

});

export default ProductsNavigation;