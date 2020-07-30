import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import DefaultValues from '../../constants/DefaultValues';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from "../../store/actions/products";

import Colors from "../../constants/Colors";


const EditProductsScreen = props => {
    const dispatch = useDispatch();

    const productID = props.navigation.getParam("productID");
    const selectedProduct = useSelector(state => state.products.userProducts.find(product => product.id === productID));

    const [title, setTitle] = useState(selectedProduct ? selectedProduct.title : "");
    const [imageURL, setImageURL] = useState(selectedProduct ? selectedProduct.imageURL : "");
    const [price, setPrice] = useState(selectedProduct ? selectedProduct.price.toString() : "");
    const [description, setDescription] = useState(selectedProduct ? selectedProduct.description : "");

    const submitDataHandler = () => {
        if (selectedProduct) {
            console.log("ProductID: " + productID);
            dispatch(productActions.updateProduct(productID, title, imageURL, description));
            
        } else {
            dispatch(productActions.createProduct(title, imageURL, +price, description));
        }
        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={value => setTitle(value)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageURL} onChangeText={value => setImageURL(value)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={value => setPrice(value)} editable={selectedProduct ? false : true} />
                                        
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={value => setDescription(value)} />
                </View>
                <View>
                    <Button title="Submit" color={Colors.danger} onPress={submitDataHandler} />
                </View>
            </View>
        </ScrollView>
    )
};

EditProductsScreen.navigationOptions = navigationData => {
    return {
        title: navigationData.navigation.getParam("productID") ? "Edit Product" : "Add Product",
    }
}


const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: "100%",
    },
    label: {
        fontFamily: DefaultValues.fontBold
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    }
});

export default EditProductsScreen;