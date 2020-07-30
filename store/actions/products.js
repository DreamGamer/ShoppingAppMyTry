export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productID) => {
    return { type: DELETE_PRODUCT, productID: productID };
};

export const createProduct = (title, imageURL, price, description) => {
    return {
        type: CREATE_PRODUCT, productData: {
            title: title,
            imageURL: imageURL,
            price: price,
            description: description
        }
    };
};

export const updateProduct = (productID, title, imageURL, description) => {
    return {
        type: UPDATE_PRODUCT, productData: {
            productID: productID,
            title: title,
            imageURL: imageURL,
            description: description
        }
    }
}