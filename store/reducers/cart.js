import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/Cart-Item";
import { ADD_ORDER } from "../actions/order";

const initalState = {
    items: {},
    totalAmount: 0
}

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;

            if (state.items[addedProduct.id]) {
                // Already in Cart
                const updatedCartItem = new CartItem(state.items[addedProduct.id].quantity + 1, productPrice, productTitle, state.items[addedProduct.id].sum + productPrice);

                return {
                    ...state, items: { ...state.items, [addedProduct.id]: updatedCartItem },
                    totalAmount: state.totalAmount + productPrice
                }
            } else {
                // Not in Cart
                const newCartItem = new CartItem(1, productPrice, productTitle, productPrice)
                return {
                    ...state, items: { ...state.items, [addedProduct.id]: newCartItem },
                    totalAmount: state.totalAmount + productPrice
                }
            }
            break;
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productID];
            const currentQuantity = selectedCartItem.quantity;
            const productPrice2 = selectedCartItem.productPrice;

            let updatedCartItems;

            if (currentQuantity > 1) {
                // Reduce it
                const updatedCartItem = new CartItem(selectedCartItem.quantity - 1, productPrice2, selectedCartItem.productTitle, selectedCartItem.sum - productPrice2);
                updatedCartItems = { ...state.items, [action.productID]: updatedCartItem }
            } else {
                // Remove
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.productID];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - productPrice2
            }
        case ADD_ORDER:
            return initalState;

    }

    return state;
}