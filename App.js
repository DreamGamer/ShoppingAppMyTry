import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import cartReducer  from "./store/reducers/cart";
import orderReducer  from "./store/reducers/order";
import MainNavigation from './navigation/MainNavigation';
import { enableScreens } from "react-native-screens";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";


const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer, composeWithDevTools(), applyMiddleware(ReduxThunk));


export default function App() {
  // Optimize Screen Performance
  enableScreens();

  // States
  const [fontLoaded, setFontLoaded] = useState(false);

  // Functions to load fonts
  const fetchFonts = () => {
    return Font.loadAsync({
      "ms-new-tai-lue": require("./assets/fonts/microsoft-new-tai-lue-regular.ttf"),
      "ms-new-tai-lue-bold": require("./assets/fonts/microsoft-new-tai-lue-bold.ttf")
    });
  }


  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} />
  }




  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
