import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import DefaultValues from '../../constants/DefaultValues';
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/order";

import CartItem from "../../components/shop/CartItem";


const ShoppingCart = props => {

    const totalAmount = useSelector(state => state.cart.totalAmount);

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const dispatch = useDispatch();

    const cartItems = useSelector(state => {
        const listOfCartItems = [];
        for (const key in state.cart.items) {
            listOfCartItems.push({
                productID: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return listOfCartItems.sort((a, b) => a.productID > b.productID ? 1 : -1);
    });
    
    const placeOrderHandler = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItems, totalAmount));
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.actionContainer}>
                <Text style={styles.totalAmount}>Total: <Text style={styles.highlightText}>{Math.round(totalAmount.toFixed(2) * 100) / 100} €</Text></Text>
                <Button title="Order Now" disabled={cartItems.length <= 0} onPress={placeOrderHandler} />
            </View>

            <View style={styles.itemsContainer}>
                <FlatList keyExtractor={(item, index) => item.productID} data={cartItems} renderItem={itemData => <CartItem deletable onRemove={() => {
                    dispatch(cartActions.removeFromCart(itemData.item.productID));
                }} title={itemData.item.productTitle} quantity={itemData.item.quantity} totalAmount={itemData.item.sum} />} />
            </View>
        </View>
    )
};

ShoppingCart.navigationOptions = navigationData => {
    return {
        title: "Shopping Cart",
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    actionContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
        flexDirection: "row",
        marginVertical: 15,
        justifyContent: "space-between",
        padding: 10,
    },
    totalAmount: {
        fontFamily: DefaultValues.fontBold,
    },
    highlightText: {
        color: Colors.danger
    },
    itemsContainer: {
        width: "90%",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default ShoppingCart;