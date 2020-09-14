import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Button, RefreshControl, ScrollView } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from "../../components/shop/ProductList";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/ui/HeaderButton";

import AddItemToCart from "../../components/shop/AddItemToCart";
import DefaultValues from '../../constants/DefaultValues';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [hasError, setHasError] = useState();
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setHasError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (error) {
            console.log(error);
            setHasError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setHasError, setIsRefreshing]);

    useEffect(() => {
        setIsLoading(true);
        loadProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadProducts]);

    useEffect(() => {
        const willFocusListener = props.navigation.addListener("willFocus", loadProducts);

        return () => {
            willFocusListener.remove();
        }
    }, [loadProducts])

    const showDetaiilsHandler = (id, title) => {
        props.navigation.navigate({ routeName: "productDetailsShop", params: { itemID: id, itemTitle: title } });
    };

    const addToCartHandler = choosedItem => {
        dispatch(cartActions.addToCart(choosedItem));
    }
    if (hasError) {
        return (
            <View style={styles.centerContent}>
                <Text>An error occured!</Text>
                <Text>Error: {hasError}</Text>
                <Button title="Refresh" onPress={loadProducts} />
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.centerContent}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }



    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centerContent}>
                <Text>No products found.</Text>
                <Text>Start create some and fill the Store :)</Text>
            </View>
        )
    }

    return (
        <FlatList refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={loadProducts} />} data={products} keyExtractor={item => item.id} renderItem={itemData => (
            <ProductList title={itemData.item.title} imageURL={itemData.item.imageURL} price={itemData.item.price} onViewDetails={() => { showDetaiilsHandler(itemData.item.id, itemData.item.title) }} onAddToCart={() => { onAddToCartHandler(itemData.item) }}>
                <View style={styles.actionItem}>
                    <Text style={styles.priceText}>{itemData.item.price ? itemData.item.price.toFixed(2) : "NaN"}€</Text>
                </View>
                <View style={styles.actionItem}>
                    <AddItemToCart onPress={() => { addToCartHandler(itemData.item) }} />
                </View>
            </ProductList>
        )} />
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
    centerContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
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
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default ProductsOverviewScreen;