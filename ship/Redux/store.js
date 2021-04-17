import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import cartItems from "../Redux/Reducers/cartItem";

const reducer = combineReducers({
  cartItems,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;
