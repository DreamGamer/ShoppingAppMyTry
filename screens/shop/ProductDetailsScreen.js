import React from 'react';
import { StyleSheet, View, Text } from "react-native";


const ProductDetailsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>ProductDetailsScreen</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProductDetailsScreen;