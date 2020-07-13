import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from "../ui/HeaderButton";
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';


const OrdersScreen = props => {

    const orders = useSelector(state => state.orders.orders);
    console.log(orders);


    return (
        <View style={styles.screen}>
            <FlatList keyExtractor={item => item.id} data={orders} renderItem={itemData => 
                <Text>{itemData.item.totalAmount}</Text>
            } />
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
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default OrdersScreen;