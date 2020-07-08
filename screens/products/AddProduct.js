import React from 'react';
import { StyleSheet, View, Text } from "react-native";


const AddProduct = props => {
    return (
        <View style={styles.screen}>
            <Text>AddProduct</Text>
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

export default AddProduct;