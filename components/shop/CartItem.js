import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DefaultValues from '../../constants/DefaultValues';
import Colors from '../../constants/Colors';

const CartItem = props => {
    return (
        <View style={styles.container}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity}x</Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.totalAmount}>{props.totalAmount.toFixed(2)} €</Text>
                {props.deletable &&
                    <TouchableOpacity onPress={props.onRemove} style={styles.trashcan}>
                        <Ionicons name="md-trash" size={23} color={Colors.danger} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        padding: 10
    },
    itemData: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantity: {
        fontFamily: DefaultValues.fontRegular,
        fontSize: 16,
        marginRight: 5
    },
    totalAmount: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 16,
    },
    title: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 16,
    },
    trashcan: {
        marginLeft: 20
    }
});

export default CartItem;