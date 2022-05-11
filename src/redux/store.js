import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/auth.slice";
import {carReducer} from "./slices/car.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    cars: carReducer
});

const store = configureStore({
    reducer: rootReducer
});

export {
    store
};