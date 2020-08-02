import React, { useReducer } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import DefaultValues from '../../constants/DefaultValues';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from "../../store/actions/products";

import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";


const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedInputValues = {
                ...state.inputValues,
                [action.input]: action.value
            };

            const updatedInputValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid,
            }

            let updatedIsFormValid = true;
            for (const key in updatedInputValidities) {
                if (!updatedInputValidities[key]) {
                    updatedIsFormValid = false;
                }
            }

            return {
                ...state,
                inputValues: updatedInputValues,
                inputValidities: updatedInputValidities,
                isFormValid: updatedIsFormValid,
            }
            break;

        default:
            return state;
    }
}


const EditProductsScreen = props => {
    const dispatch = useDispatch();

    const productID = props.navigation.getParam("productID");
    const selectedProduct = useSelector(state => state.products.userProducts.find(product => product.id === productID));

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: selectedProduct ? selectedProduct.title : "",
            imageURL: selectedProduct ? selectedProduct.imageURL : "",
            price: selectedProduct ? selectedProduct.price.toString() : "",
            description: selectedProduct ? selectedProduct.description : "",
        },
        inputValidities: {
            title: selectedProduct ? true : false,
            imageURL: selectedProduct ? true : false,
            price: selectedProduct ? true : false,
            description: selectedProduct ? true : false,
        },
        isFormValid: selectedProduct ? true : false,
    })

    const submitDataHandler = () => {
        if (!formState.isFormValid) {
            Alert.alert("Incorrect input!", "Please fill all inputs.", [{
                text: "Ok"
            }])
            return;
        }

        if (selectedProduct) {
            dispatch(productActions.updateProduct(productID, formState.inputValues.title, formState.inputValues.imageURL, formState.inputValues.description));

        } else {
            dispatch(productActions.createProduct(formState.inputValues.title, formState.inputValues.imageURL, +formState.inputValues.price, formState.inputValues.description));
        }
        props.navigation.goBack();
    }

    const inputTextChangeHandler = (inputName, value) => {
        let isValid = false;
        if (value.trim().length > 0) {
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: value,
            isValid: isValid,
            input: inputName,
        });
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={{ ...styles.input, ...{ borderBottomColor: formState.inputValidities.title ? "#ccc" : Colors.danger } }} value={formState.inputValues.title} onChangeText={inputTextChangeHandler.bind(this, "title")} keyboardType="default" autoCapitalize="sentences" autoCorrect={true} returnKeyType="next" />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={{ ...styles.input, ...{ borderBottomColor: formState.inputValidities.imageURL ? "#ccc" : Colors.danger } }} value={formState.inputValues.imageURL} onChangeText={inputTextChangeHandler.bind(this, "imageURL")} keyboardType="url" returnKeyType="next" />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={{ ...styles.input, ...{ borderBottomColor: formState.inputValidities.price ? "#ccc" : Colors.danger } }} value={formState.inputValues.price} onChangeText={inputTextChangeHandler.bind(this, "price")} editable={selectedProduct ? false : true} keyboardType="decimal-pad" returnKeyType="next" />

                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={{ ...styles.input, ...{ borderBottomColor: formState.inputValidities.description ? "#ccc" : Colors.danger } }} value={formState.inputValues.description} onChangeText={inputTextChangeHandler.bind(this, "description")} keyboardType="default" autoCorrect={true} returnKeyType="default" />
                </View>
                <View style={styles.submitButtonContainer}>
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
        fontFamily: DefaultValues.fontBold,
        fontSize: 14
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    submitButtonContainer: {
        marginVertical: 20,
    }
});

export default EditProductsScreen;