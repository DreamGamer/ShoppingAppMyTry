import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { View, StyleSheet, Text } from "react-native";
import DefaultValues from "../../constants/DefaultValues";

const Label = props => {
   return (
       <View style={styles.container}>
           <Text style={styles.labelText}>{props.text}</Text>
       </View>
   )
};

const styles = StyleSheet.create({
    container: {

    },
    labelText: {
        fontSize: 16,
        fontFamily: DefaultValues.fontBold,
    }

});

export default Label;