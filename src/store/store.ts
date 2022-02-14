import {applyMiddleware, combineReducers, createStore} from "redux";
import {ActionsTypeForLoginReducer, LoginReducer} from "../reducers/LoginReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {ActionsTypeForProfileReducer, ProfileReducer} from "../reducers/ProfileReducer";
import {ActionsTypeForColodaReducer, ColodaReducer} from "../reducers/ColodaReducer";
import {SearchReducer} from "../reducers/SearchReducer";

let rootReducer = combineReducers({
    login: LoginReducer,
    profile: ProfileReducer,
    coloda: ColodaReducer,
    search:SearchReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))


//единый тип для всех экшенов
export type AppActionsType = ActionsTypeForLoginReducer | ActionsTypeForProfileReducer | ActionsTypeForColodaReducer

//для типизации Dispatch в ThunkCreator, если мы диспатчим в санке санку
//параметры ThunkAction
// 1- описываем все что возвращает thunk
// 2- общий тип всех редюсеров
// 3- экстра аргумент, не используем
// 4- единый тип для всех экшенов
//                                                   1            2             3         4
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, rootReducerType, unknown, AppActionsType>

//@ts-ignore
window.store = store
