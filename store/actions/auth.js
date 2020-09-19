import AsyncStorage from "@react-native-community/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";

export const authenticate = (token, userID) => {
    return { type: AUTHENTICATE, token: token, userID: userID }
}

export const signup = (email, password) => {
    return async dispatch => {
        // console.log("Email:" + email);
        // console.log("Password: " + password);
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-ocvKVQs0KgQUUSMO2Fhixy1WcSzQfdw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorResponseData = await response.json();
            const errorID = errorResponseData.error.message;
            let errorMessage = "Something went wrong while signup!";

            if (errorID === "EMAIL_EXISTS") {
                errorMessage = "There is already a account with this email."
            } else if (errorID === "OPERATION_NOT_ALLOWED") {
                errorMessage = "Sign Up isn't allowed.";
            } else if (errorID === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                errorMessage = "Too many signup attempts, please try again later."
            }

            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        console.log(responseData);

        dispatch(authenticate(responseData.localId, responseData.idToken));

        const expireDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
        saveDataToStorage(responseData.idToken, responseData.localId, expireDate);
    }
};

export const login = (email, password) => {
    return async dispatch => {

        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-ocvKVQs0KgQUUSMO2Fhixy1WcSzQfdw", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });


        if (!response.ok) {
            const errorResponseData = await response.json();
            const errorID = errorResponseData.error.message;
            let errorMessage = "Something went wrong while login!";
            console.log(errorResponseData);
            if (errorID === "EMAIL_NOT_FOUND") {
                errorMessage = "No user with this Email found.";
            } else if (errorID === "INVALID_PASSWORD") {
                errorMessage = "Invalid Password.";
            } else if (errorID === "USER_DISABLED") {
                errorMessage = "You account is disabled. Please contact Support.";
            } else if (errorID === "INVALID_EMAIL") {
                errorMessage = "No valid Email entered.";
            } else if (errorID === "MISSING_PASSWORD") {
                errorMessage = "No valid Password entered.";
            }


            throw new Error(errorMessage);
        }

        const responseData = await response.json();
        console.log(responseData);


        dispatch(authenticate(responseData.localId, responseData.idToken));

        const expireDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
        saveDataToStorage(responseData.idToken, responseData.localId, expireDate);
    };
};

const saveDataToStorage = (token, userID, expireDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userID: userID,
        expireDate: expireDate.toISOString()
    }));
};