import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import ProductList from "../../components/shop/ProductList";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from "../../components/ui/HeaderButton";;

import * as productsAction from "../../store/actions/products";
import DefaultValues from '../../constants/DefaultValues';


const ManageProductsScreen = props => {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.products.userProducts);
    const [hasError, setHasError] = useState();


    const showDetaiilsHandler = (id, title) => {
        props.navigation.navigate({ routeName: "productDetailsUser", params: { itemID: id, itemTitle: title } });
    };

    const editProductHandler = (id) => {
        props.navigation.navigate({routeName: "editProduct", params: {productID: id}});
    };

    const deleteHandler = (productID) => {
        Alert.alert("Are you sure?", "Do you really want to delete this Product?", [
            {text: "No", style: "default"},
            {text: "Yes", style: "destructive", onPress: async () => {
                setHasError(null);
                try {
                    await dispatch(productsAction.deleteProduct(productID));
                } catch (error) {
                    setHasError(error.message);
                }
            }}
        ])
    }

    useEffect(() => {
        if (hasError) {
            Alert.alert("An error occured!", hasError, [{text: "Okay"}]);
        }
    }, [hasError]);

    if (userProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.text}>No Products found, maybe start creating some!</Text>
            </View>
        )
    }

    return (
        <View style={styles.itemList}>
            <FlatList data={userProducts} keyExtractor={item => item.id} renderItem={itemData => (
                <ProductList title={itemData.item.title} imageURL={itemData.item.imageURL} price={itemData.item.price} onViewDetails={() => { showDetaiilsHandler(itemData.item.id, itemData.item.title) }} onAddToCart={() => { }}>
                    <View style={styles.actionItem}>
                        <Button title="Edit" onPress={() => {
                            editProductHandler(itemData.item.id)
                        }} />
                    </View>
                    <View style={styles.actionItem}>
                        <Button title="Delete" onPress={() => {
                            deleteHandler(itemData.item.id);
                        }} />
                    </View>
                </ProductList>
            )} />
        </View>
    )
};

ManageProductsScreen.navigationOptions = navigationData => {
    return {
        title: "Your Products",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Add" iconName="ios-create" onPress={() => {
                    navigationData.navigation.navigate({routeName: "editProduct"});
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
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: DefaultValues.fontRegular,
    }
});

export default ManageProductsScreen;