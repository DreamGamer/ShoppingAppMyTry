import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from "../../components/ui/HeaderButton";
import { useSelector, useDispatch } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import * as ordersActions from "../../store/actions/order";

import OrderItem from "../../components/orders/OrderItem";
import DefaultValues from '../../constants/DefaultValues';


const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, isHasError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (orders.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.text}>No Orders found, maybe start ordering something!</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <FlatList keyExtractor={item => item.id} data={orders} renderItem={itemData => <OrderItem totalAmount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} />} />
        </View>
    )
};

OrdersScreen.navigationOptions = navigationData => {
    return {
        title: "Your Orders",
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {
                    navigationData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
};


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: DefaultValues.fontRegular
    },
});

export default OrdersScreen;