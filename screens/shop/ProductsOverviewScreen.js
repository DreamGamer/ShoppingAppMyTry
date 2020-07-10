import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ProductList from "../../components/shop/ProductList";


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);


    const showDetaiils = (id, title) => {
        props.navigation.navigate({routeName: "productDetails", params: {itemID: id, itemTitle: title}});
    };



    return (
        <View style={styles.itemList}>
            <FlatList data={products} renderItem={itemData => <ProductList item={itemData.item} onViewDetails={() => { showDetaiils(itemData.item.id, itemData.item.title); }} onAddToCart={() => { console.log("Add to Cart"); }} />} style={styles.fullWidth} />
        </View>
    )
};

// Set NavigationOptions
ProductsOverviewScreen.navigationOptions = navigationData => {
    return {
        title: "All Products",
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