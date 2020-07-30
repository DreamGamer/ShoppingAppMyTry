import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import AddItemToCart from '../../components/shop/AddItemToCart';
import DefaultValues from '../../constants/DefaultValues';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from "../../store/actions/cart";
import HeaderButton from "../ui/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";


const ProductDetailsScreen = props => {
    const productID = props.navigation.getParam("itemID");

    const selectedItem = useSelector(state => state.products.availableProducts.find(value => value.id === productID));

    const dispatch = useDispatch();


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
                            <AddItemToCart onPress={() => { dispatch(cartActions.addToCart(selectedItem)) }} />
                        </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionTitle}>Description:</Text>
                        <Text style={styles.descriptionText} >{selectedItem.description}</Text>
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Cart" iconName="ios-cart" onPress={() => {
                    navigationData.navigation.navigate({ routeName: "shoppingCart" });
                }} />
            </HeaderButtons>
        )
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
    },
    descriptionTitle: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 18,
    },
    descriptionText: {
        fontFamily: DefaultValues.fontRegular,
        fontSize: 14,
    },
    descriptionContainer: {
        marginHorizontal: 10,
    },
});

export default ProductDetailsScreen;