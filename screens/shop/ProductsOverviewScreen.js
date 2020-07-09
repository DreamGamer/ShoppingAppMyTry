import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList data={products} renderItem={itemData => <Text>{itemData.item.title}</Text>} />
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProductsOverviewScreen;