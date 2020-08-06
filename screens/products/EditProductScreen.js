import React, { useReducer, useCallback } from 'react';
import { StyleSheet, View, Button, Alert, KeyboardAvoidingView } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import DefaultValues from '../../constants/DefaultValues';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from "../../store/actions/products";

import InputField from "../../components/ui/InputField";

import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const FORM_INPUT_BLUR = "FORM_INPUT_BLUR";


const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedInputValues = {
                ...state.inputValues,
                [action.inputID]: action.value
            };

            const updatedInputValidities = {
                ...state.inputValidities,
                [action.inputID]: action.isValid,
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

        case FORM_INPUT_BLUR:
            return {
                ...state,
                touched: true,
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
        touched: false,
    });


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

    const inputChangeHandler = useCallback((inputID, value, isValid) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            inputID: inputID,
            value: value,
            isValid: isValid,
        });
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <InputField inputID="title" label="Title" onInputChange={inputChangeHandler} keyboardType="default" autoCapitalize="sentences" autoCorrect={true} returnKeyType="next" initValue={selectedProduct ? selectedProduct.title : ""} errorText="Please enter a valid title!" required />
                    <InputField inputID="imageURL" label="Image URL" onInputChange={inputChangeHandler} keyboardType="url" returnKeyType="next" initValue={selectedProduct ? selectedProduct.imageURL : ""} errorText="Please enter a valid image url!" required />
                    <InputField inputID="price" label="Price" onInputChange={inputChangeHandler} editable={selectedProduct ? false : true} keyboardType="decimal-pad" returnKeyType="next" initValue={selectedProduct ? selectedProduct.price.toString() : ""} errorText="Please enter a valid price!" required min={0.01} decimal />
                    <InputField inputID="description" label="Description" onInputChange={inputChangeHandler} keyboardType="default" autoCorrect={true} multiLine={true} numberOfLines={3} initValue={selectedProduct ? selectedProduct.description : ""} errorText="Please enter a valid description!" required minLength={4} />
                </View>
                <View style={styles.submitButtonContainer}>
                    <Button title="Submit" color={Colors.danger} onPress={submitDataHandler} />
                </View>
            </ScrollView >
        </KeyboardAvoidingView>
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
    submitButtonContainer: {
        marginVertical: 20,
    }
});

export default EditProductsScreen;