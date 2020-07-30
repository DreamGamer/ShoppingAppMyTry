import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, Button } from 'react-native';
import DefaultValues from "../../constants/DefaultValues";
import AddItemToCart from "./AddItemToCart";
import Colors from '../../constants/Colors';
import DetailsButton from "../../components/shop/DetailsButton";
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProductItem = props => {
    return (
        <View style={styles.container}>
            <View style={styles.backgroundImageContainer}>
                <ImageBackground style={styles.backgroundImage} source={{ uri: props.imageURL }} >
                    <TouchableOpacity onPress={props.onViewDetails} activeOpacity={0.8}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{props.title}</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.detailsContainer}>
                <DetailsButton onPress={props.onViewDetails} />
            </View>

            <View style={styles.actionContainer}>
                {props.children}
            </View >
        </View >
    )
};


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width * 0.925,
        height: 350,
        backgroundColor: Colors.lightGrey,
        borderRadius: 3,
        overflow: "hidden",
        shadowColor: Colors.shadowColor,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    },
    backgroundImageContainer: {
        width: "100%",
        height: "70%",
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    titleContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        justifyContent: "center"
    },
    title: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 26,
        textAlign: "center",
        color: "#f9f9f9",
    },
    actionContainer: {
        width: "100%",
        height: "20%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    priceText: {
        fontFamily: DefaultValues.fontRegular,
        fontSize: 22,
    },
    detailsContainer: {
        height: "10%",
    },
    actionItem: {
        height: "100%",
        justifyContent: "center",
    },
});

export default ProductItem;