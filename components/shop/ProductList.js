import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import ProductItem from "./ProductItem";

const ProductList = props => {
    return (
        <View style={styles.container}>
            <ProductItem id={props.item.id} title={props.item.title} imageURL={props.item.imageURL} price={props.item.price} onViewDetails={props.onViewDetails} onAddToCart={props.onAddToCart} />
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
});

export default ProductList;