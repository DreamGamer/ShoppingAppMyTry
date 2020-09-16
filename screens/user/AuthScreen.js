import React from "react";
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Text, Dimensions, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import InputField from "../../components/ui/InputField";
import Label from "../../components/ui/Label";
import Colors from "../../constants/Colors";

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
            <LinearGradient colors={["#00bee3", "#ffeeff"]} style={styles.gradient} >
                <ScrollView>
                    <View style={styles.centerContainer}>
                        <View style={styles.container}>
                            <InputField id="email" label="E-mail" keyboardType="email-address" required email autoCapitalize="none" errorText="Please enter a valid E-mail adresse." onInputChange={() => { }} initialValue="" />
                            <InputField id="password" label="Password" keyboardTyoe="default" secureTextEntry required minLength={5} autoCapitalize="none" errorText="Please enter a valid Password." onInputChange={() => { }} initialValue="" />
                            <View style={styles.buttonContainer}>
                                <Button title="Login" onPress={() => { }} />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button title="Switch to Sign Up" color={Colors.warning} onPress={() => { }} />
                            </View>
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
    },
    centerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
    },
    gradient: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        marginTop: 20,
    }
});

export default AuthScreen;