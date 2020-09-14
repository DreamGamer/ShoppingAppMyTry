import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch("https://shoppingappmytry.firebaseio.com/orders/u1.json");

            if (!response.ok) {
                throw new Error("Something went wrong with the response on fetchOrders!");
            }

            const responseData = await response.json();
            const loadedOrders = [];

            for (const key in responseData) {
                loadedOrders.push(new Order(key, responseData[key].cartItems, responseData[key].totalAmount, new Date(responseData[key].date)));
            }

            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (error) {
            throw error;
        }
    }
}

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();


        const response = await fetch("https://shoppingappmytry.firebaseio.com/orders/u1.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cartItems: cartItems,
                totalAmount: totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error("Something went Wrong!");
        }


        const responseData = await response.json();

        dispatch({ type: ADD_ORDER, orderData: { id: responseData.name, items: cartItems, totalAmount: totalAmount, date: date } });
    }
}