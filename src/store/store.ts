import {applyMiddleware, combineReducers, createStore} from "redux";
import {LoginReducer} from "../reducers/LoginReducer";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
    login: LoginReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))


 //@ts-ignore
window.store=store
