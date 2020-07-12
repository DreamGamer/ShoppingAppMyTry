import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from "../../components/shop/ProductList";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../ui/HeaderButton";


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();


    const showDetaiils = (id, title) => {
        props.navigation.navigate({routeName: "productDetails", params: {itemID: id, itemTitle: title}});
    };



    return (
        <View style={styles.itemList}>
            <FlatList data={products} renderItem={itemData => <ProductList item={itemData.item} onViewDetails={() => {
                showDetaiils(itemData.item.id, itemData.item.title);
            }} onAddToCart={() => {
                dispatch(cartActions.addToCart(itemData.item));
            }} />} style={styles.fullWidth} />
        </View>
    )
};

// Set NavigationOptions
ProductsOverviewScreen.navigationOptions = navigationData => {
    return {
        title: "All Products",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Cart" iconName="ios-cart" onPress={() => {
                    navigationData.navigation.navigate({routeName: "shoppingCart"});
                }} />
            </HeaderButtons>
        )
    }
};


const styles = StyleSheet.create({
    itemList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default ProductsOverviewScreen;