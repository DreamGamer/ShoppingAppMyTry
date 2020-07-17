import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import CartItem from "../shop/CartItem";

import Colors from "../../constants/Colors";
import DefaultValues from "../../constants/DefaultValues";

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.informationContainer}>
                <Text style={styles.totalAmount}>{props.totalAmount.toFixed(2)} €</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button title="Show Details" onPress={() => {
                setShowDetails(state => !state);
            }} />
            {showDetails && <View>
                {props.items.map(cartItem => <CartItem quanitity={cartItem.quanitity} amount={cartItem.sum} title={cartItem.productTitle} />)}
                </View>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 3,
        overflow: "hidden",
        shadowColor: Colors.shadowColor,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        margin: 20,
        padding: 10,
        alignItems: "center",
    },
    informationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    totalAmount: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 16,
    },
    date: {
        fontFamily: DefaultValues.fontRegular,
        fontSize: 16,
        color: "#888"
    }
});

export default OrderItem;