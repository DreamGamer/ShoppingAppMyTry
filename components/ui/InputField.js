import React, { useReducer, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import DefaultValues from "../../constants/DefaultValues";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
            break;
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
            }
            break;
        default:
            return state;
    }
}


const InputField = props => {
    const [inputState, inputDispatch] = useReducer(inputReducer, {
        value: props.initValue ? props.initValue : "",
        isValid: true,
        touched: false,
    });

    const { onInputChange, inputID } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(inputID, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, inputID]);

    const onInputChangeHandler = (value) => {
        let isValid = true;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (props.required && value.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(value.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +value < props.min) {
            isValid = false;
        }
        if (props.max != null && +value > props.max) {
            isValid = false;
        }
        if (props.minLength != null && value.length < props.minLength) {
            isValid = false;
        }


        inputDispatch({ type: INPUT_CHANGE, value: value, isValid: isValid });
    };

    const lostFocusHandler = () => {
        inputDispatch({ type: INPUT_BLUR });
    };


    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput {...props} style={{ ...styles.input, ...{ borderBottomColor: inputState.isValid ? "#ccc" : Colors.danger } }} onChangeText={onInputChangeHandler} value={inputState.value} onBlur={lostFocusHandler} />
            {!inputState.isValid && inputState.touched && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View> 
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    formControl: {
        width: "100%",
    },
    label: {
        fontFamily: DefaultValues.fontBold,
        fontSize: 14
    },
    errorContainer: {
        marginBottom:10
    },
    errorText: {
        fontFamily: DefaultValues.fontRegular,
        color: Colors.danger,
        fontSize: 13
    }
});

export default InputField;