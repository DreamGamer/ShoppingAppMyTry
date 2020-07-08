import React from 'react';
import { StyleSheet, View, Text } from "react-native";


const OrdersScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>OrdersScreen</Text>
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

export default OrdersScreen;