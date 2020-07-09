import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ProductList from "../../components/shop/ProductList";


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <View style={styles.itemList}>
            <FlatList data={products} renderItem={itemData => <ProductList item={itemData.item} onViewDetails={() => { console.log("View Details"); }} onAddToCart={() => { console.log("Add to Cart"); }} />} style={styles.fullWidth} />
        </View>
    )
};

// Set NavigationOptions
ProductsOverviewScreen.navigationOptions = navigationData => {
    return {
        title: "Products",
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