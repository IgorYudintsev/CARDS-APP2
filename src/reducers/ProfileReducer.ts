import {cardPackDATA, getCardPacks, ProfileApi} from "../Api/ProfileApi";
import {Dispatch} from "redux";
import {payloadForGetCardsType} from "../aplication/pages/Profile";
import {AppThunk} from "../store/store";

type initialStateType = typeof initialState
let initialState = {
    cardPacks: [] as Array<cardPackDATA>,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 10,
    token: ''
}

export const ProfileReducer = (state: initialStateType = initialState, action: ActionsTypeForProfileReducer) => {
    switch (action.type) {
        case "GET-CARDS-PACK": {
            return {...action.payload.data, cardPacks: action.payload.data.cardPacks}
        }
        case "ADD-CARDS-PACK": {
            console.log(action.payload.data)
            // return {...state, cardPacks: [action.payload.data, ...state.cardPacks]}
            return {...state, cardPacks: [action.payload.data, ...state.cardPacks]}
        }
        case "DELETE-CARDS-PACK": {
            return {...state, cardPacks: state.cardPacks.filter(f => f._id !== action.payload.id)}
        }
        case "GET-CARDS-PACK-PAGINATION": {
            console.log(action.data)
            return action.data
            // return {...state} = action.data
        }
        default:
            return state
    }

}

export type ActionsTypeForProfileReducer =
    getCardsPackACType
    | addCardsPackACType
    | deleteCardsPackACType
    | getCardsPackForPaginationACType
type getCardsPackACType = ReturnType<typeof getCardsPackAC>
export const getCardsPackAC = (data: getCardPacks) => {
    return {
        type: 'GET-CARDS-PACK',
        payload: {data}
    } as const
}

export const getCardsPackThunk = (payload: payloadForGetCardsType) => async (dispatch: Dispatch) => {
    try {
        let res = await ProfileApi.getCardsPack(payload)
        // let res = await ProfileApi.getCardsPack()
        dispatch(getCardsPackAC(res.data))
    } catch {

    }
}

type addCardsPackACType = ReturnType<typeof addCardsPackAC>
const addCardsPackAC = (data: cardPackDATA) => {
    return {
        type: 'ADD-CARDS-PACK',
        payload: {data}
    } as const
}

//пример вызова санки САНКОЙ и ее типизация
export const addCardsPackThunk = (payload: payloadForGetCardsType, inputTitle: string,): AppThunk =>
    async (dispatch) => {
        try {
            let res = await ProfileApi.addCardsPack(inputTitle);
            // dispatch(addCardsPackAC(res.data.newCardsPack))
            dispatch(getCardsPackThunk(payload))
            localStorage.setItem('userID', res.data.newCardsPack.user_id)
        } catch {
            console.log('ERROR')
        }
    }

type deleteCardsPackACType = ReturnType<typeof deleteCardsPackAC>
const deleteCardsPackAC = (id: string) => {
    return {
        type: 'DELETE-CARDS-PACK',
        payload: {id}
    } as const
}

export const deleteCardsPackThunk = (id: string, payload: payloadForGetCardsType): AppThunk => async (dispatch) => {
    try {
        let res = await ProfileApi.deleteCardsPack(id)
        // dispatch(deleteCardsPackAC(id))
        dispatch(getCardsPackThunk(payload))
    } catch {
        console.log('pizdec')
    }
}

export const updateCardsPackThunk = (id: string, payload: payloadForGetCardsType,inputTitle:string): AppThunk => async (dispatch) => {
    try {
        let res = await ProfileApi.updateCardsPack(id,inputTitle)
        console.log(res.data)
        dispatch(getCardsPackThunk(payload))
    } catch {
        console.log('error')
    }
}

type getCardsPackForPaginationACType = ReturnType<typeof getCardsPackForPaginationAC>
export const getCardsPackForPaginationAC = (data: any) => {
    return {type: 'GET-CARDS-PACK-PAGINATION', data} as const
}

export const getCardsPackForPaginationThunk = (pageOfPagination: number): AppThunk => async (dispatch) => {
    try {
        let pagePageCount = {
            page: pageOfPagination,
            pageCount: 10,
        }
        let res = await ProfileApi.GETCardsPackForPagination(pagePageCount)
        dispatch(getCardsPackForPaginationAC(res.data))
    } catch {
        console.log('error')
    }
}








































