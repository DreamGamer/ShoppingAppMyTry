import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from "../../components/ui/HeaderButton";
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import OrderItem from "../../components/orders/OrderItem";


const OrdersScreen = props => {

    const orders = useSelector(state => state.orders.orders);


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
    screen: {
    },
});

export default OrdersScreen;