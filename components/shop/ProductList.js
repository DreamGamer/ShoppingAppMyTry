import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../../constants/Colors';
import ProductItem from "./ProductItem";

const ProductList = props => {
    return (
        <View style={styles.container}>
            <ProductItem {...props} />
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
});

export default ProductList;