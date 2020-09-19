import PRODUCTS from "../../data/dummy-data";

import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from "../actions/products";
import Product from "../../models/Product";



const initialState = {
    availableProducts: [],
    userProducts: [],
};


export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.productID),
                availableProducts: state.availableProducts.filter(product => product.id !== action.productID),
            }
            break;
        case CREATE_PRODUCT:
            const newProduct = new Product(action.productData.id, action.productData.ownerID, action.productData.title, action.productData.imageURL, action.productData.description, action.productData.price);

            return {
                ...state,
                userProducts: state.userProducts.concat(newProduct),
                availableProducts: state.availableProducts.concat(newProduct),
            }
            break;
        case UPDATE_PRODUCT:
            const productID = action.productData.productID;
            const userProductIndex = state.userProducts.findIndex(product => product.id === productID);
            const availableProductIndex = state.availableProducts.findIndex(product => product.id === productID);
            const updatedProduct = new Product(productID, state.userProducts[userProductIndex].ownerID, action.productData.title, action.productData.imageURL, action.productData.description, state.userProducts[userProductIndex].price);
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[userProductIndex] = updatedProduct;

            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            return {
                ...state,
                userProducts: updatedUserProducts,
                availableProducts: updatedAvailableProducts,
            }

            break;
        case SET_PRODUCTS:
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.userProducts
            }
            break;
    }
    return state;
};