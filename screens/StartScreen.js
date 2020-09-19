import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const StartScreen = props => {
    const dispatch = useDispatch();


    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData");
            if (!userData) {
                props.navigation.navigate("Auth");
                return;
            }


            const transformedData = JSON.parse(userData);
            const { token, userID, expireDate } = transformedData;

            const convertedExpireDate = new Date(expireDate);
            if (convertedExpireDate <= new Date() || !token || !userID) {
                props.navigation.navigate("Auth");
                return;
            }

            const expirationTime = convertedExpireDate.getTime() - new Date().getTime();

            await dispatch(authActions.authenticate(token, userID, expirationTime));
        }

        tryLogin();
    }, [dispatch]);



    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" />
        </View>
    )
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default StartScreen;