import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import AddItemToCart from '../../components/shop/AddItemToCart';
import DefaultValues from '../../constants/DefaultValues';
import { useSelector } from 'react-redux';


const ProductDetailsScreen = props => {
    const productID = props.navigation.getParam("itemID");

    const selectedItem = useSelector(state => state.products.availableProducts.find(value => value.id === productID));


    return (
        <View style={styles.item}>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: selectedItem.imageURL }} />
                    </View>


                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{selectedItem.title}</Text>
                    </View>

                    <View style={styles.line}></View>

                    <View style={styles.actionContainer}>
                        <View style={styles.priceTextContainer}>
                            <Text style={styles.priceText}>{selectedItem.price.toFixed(2)}€</Text>
                        </View>
                        <View style={styles.addToCartContainer}>
                            <AddItemToCart onPress={() => { }} />
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
};

ProductDetailsScreen.navigationOptions = navigationData => {
    const title = navigationData.navigation.getParam("itemTitle") + " Details";

    return {
        title: title,
    }
};


const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
    },
    container: {
        width: Dimensions.get("window").width * 0.925,
        borderRadius: 3,
        overflow: "hidden",
    },
    imageContainer: {
        backgroundColor: Colors.lightGrey,
    },
    image: {
        aspectRatio: 16 / 9,
    },
    informationContainer: {

    },
    actionContainer: {
        paddingHorizontal: 10,
        marginVertical: 10,
        alignItems: "baseline",
    },
    title: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 20,
        marginVertical: 10,
        marginHorizontal: 10
    },
    line: {
        width: "100%",
        height: 1,
        backgroundColor: "#000",
    },
    priceText: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 18,
    },
    priceTextContainer: {
        justifyContent: "center",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});

export default ProductDetailsScreen;