import React, { useCallback, useReducer, useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Text, Dimensions, Button, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

import InputField from "../../components/ui/InputField";
import Colors from "../../constants/Colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:

            const updatedValues = {
                ...state.inputValues,
                [action.inputID]: action.value
            }

            const updatedValidities = {
                ...state.inputValidities,
                [action.inputID]: action.isValid
            }

            let updatedIsFormValid = true;
            for (const key in updatedValidities) {
                updatedIsFormValid = updatedIsFormValid && updatedValidities[key];
            }

            return {
                ...state,
                inputValues: updatedValues,
            }
        default:
            return state
    }
};


const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState("");

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: "",
            password: "",
        },
        inputValidities: {
            email: false,
            password: false,
        },
        isFormValid: false,
    })


    const authHandler = async () => {
        setIsLoading(true);
        try {
            if (isSignUp) {
                await dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password));
            } else {
                await dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password));
            }
            setHasError("");
            setIsLoading(false);
            props.navigation.navigate("Shop");
        } catch (error) {
            setHasError(error.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback((inputID, value, isValid) => {
        // console.log("Value: " + value + " | InputID: " + inputID + " | isValid: " + isValid);
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            inputID: inputID,
            value: value,
            isValid: isValid
        });
    }, [dispatchFormState]);

    // useEffect(() => {
    //     console.log(JSON.stringify(formState));
    // }, [formState]);

    useEffect(() => {
        if (hasError) {
            Alert.alert("An Error Occured!", hasError, [{ text: "Okay" }]);
        }
    }, [hasError])


    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20} style={styles.screen}>
            <LinearGradient colors={["#00bee3", "#ffeeff"]} style={styles.gradient} >
                <ScrollView>
                    <View style={styles.container}>
                        <InputField inputID="email" label="E-mail" keyboardType="email-address" required email autoCapitalize="none" errorText="Please enter a valid E-mail adresse." onInputChange={inputChangeHandler} initialValue="" />
                        <InputField inputID="password" label="Password" keyboardTyoe="default" secureTextEntry required minLength={5} autoCapitalize="none" errorText="Please enter a valid Password." onInputChange={inputChangeHandler} initialValue="" />
                        <View style={styles.buttonContainer}>
                            {isLoading ? <ActivityIndicator size="small" /> : <Button title={isSignUp ? "Sign Up" : "Login"} onPress={authHandler} />}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={isSignUp ? "Switch to Login" : "Switch to Sign Up"} color={Colors.warning} onPress={() => { setIsSignUp(state => !state) }} />
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
};

AuthScreen.navigationOptions = navigationData => {
    return {
        title: "Authentication"
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        width: Dimensions.get("window").width * 0.925,
        backgroundColor: Colors.lightGrey,
        borderRadius: 3,
        overflow: "hidden",
        shadowColor: Colors.shadowColor,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        padding: 10,
        marginVertical: 15,
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 20,
    }
});

export default AuthScreen;
