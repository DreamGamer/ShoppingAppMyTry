import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch("https://shoppingappmytry.firebaseio.com/products.json", {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error("Something went wrong with the response on products!");
            }

            const responseData = await response.json();
            const loadedProducts = [];

            for (const key in responseData) {
                loadedProducts.push(new Product(key, "u1", responseData[key].title, responseData[key].imageURL, responseData[key].description, responseData[key].price));
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts });
        } catch (error) {
            // Send it to Server to track errors
            throw error;
        }
    }
}

export const deleteProduct = (productID) => {
    return async dispatch => {
        try {
            const response = await fetch("https://shoppingappmytry.firebaseio.com/products/" + productID + ".json", {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Something went wrong while deleting Product!");
            }

        } catch (error) {
            throw error;
        }


        dispatch({ type: DELETE_PRODUCT, productID: productID });
    };
};

export const createProduct = (title, imageURL, price, description) => {
    return async dispatch => {
        console.log("Price: " + price);
        const response = await fetch("https://shoppingappmytry.firebaseio.com/products.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                imageURL: imageURL,
                price: price,
                description: description
            })
        });
        const responseData = await response.json();

        console.log(responseData);

        dispatch({
            type: CREATE_PRODUCT, productData: {
                id: responseData.name,
                title: title,
                imageURL: imageURL,
                price: price,
                description: description
            }
        });
    };
};

export const updateProduct = (productID, title, imageURL, description) => {
    return async dispatch => {

        try {
            const response = await fetch("https://shoppingappmytry.firebaseio.com/products/" + productID + ".json", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    imageURL: imageURL,
                    description: description,
                })
            });

            if (!response.ok) {
                throw new Error("Something went wrong while updating Product!");
            }
        } catch (error) {
            throw error;
        }

        dispatch({
            type: UPDATE_PRODUCT, productData: {
                productID: productID,
                title: title,
                imageURL: imageURL,
                description: description
            }
        });
    }
}