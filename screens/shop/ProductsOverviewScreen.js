import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from "../../components/shop/ProductList";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/ui/HeaderButton";

import AddItemToCart from "../../components/shop/AddItemToCart";
import DefaultValues from '../../constants/DefaultValues';


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();

    const showDetaiilsHandler = (id, title) => {
        props.navigation.navigate({ routeName: "productDetailsShop", params: { itemID: id, itemTitle: title } });
    };

    const addToCartHandler = choosedItem => {
        dispatch(cartActions.addToCart(choosedItem));
    }

    return (
        <View style={styles.itemList}>
            <FlatList data={products} renderItem={itemData => (
                <ProductList title={itemData.item.title} imageURL={itemData.item.imageURL} price={itemData.item.price} onViewDetails={() => { showDetaiilsHandler(itemData.item.id, itemData.item.title) }} onAddToCart={() => { onAddToCartHandler(itemData.item) }}>
                    <View style={styles.actionItem}>
                        <Text style={styles.priceText}>{itemData.item.price.toFixed(2)}€</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <AddItemToCart onPress={() => { addToCartHandler(itemData.item) }} />
                    </View>
                </ProductList>
            )} style={styles.fullWidth} />
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
                    navigationData.navigation.navigate({ routeName: "shoppingCart" });
                }} />
            </HeaderButtons>
        ),
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {
                    navigationData.navigation.toggleDrawer();
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
    },
    actionItem: {
        height: "100%",
        justifyContent: "center",
    },
    priceText: {
        fontFamily: DefaultValues.fontRegular,
        fontSize: 22,
    },
});

export default ProductsOverviewScreen;