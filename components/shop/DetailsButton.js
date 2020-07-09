import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import DefaultValues from '../../constants/DefaultValues';
import Colors from '../../constants/Colors';


const AddItemToCart = props => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress}>
            <Text style={styles.text}>Details</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    buttonContainer: {
        backgroundColor: Colors.info,
        shadowColor: Colors.shadowColor,
        shadowRadius: 0.3,
        shadowOffset: { width: 1, height: 2 },
        elevation: 3,
        overflow: 'hidden',
    },
    text: {
        fontFamily: DefaultValues.fontRegular,
        fontSize: 16,
        color: "#fff",
        textAlign: 'center',
        padding: 5
    },
});

export default AddItemToCart;