
import {addCardsCardType, cardsType, ColodaAPI} from "../Api/ColodaAPI";
import {Dispatch} from "redux";
import {AppThunk} from "../store/store";
import {payloadForGetCardsType} from "../aplication/pages/Profile";
import {ProfileApi} from "../Api/ProfileApi";
import {getCardsPackThunk} from "./ProfileReducer";

export type InitialStateType = typeof initialState
let initialState = {
    cards: [] as Array<cardsType>,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: ""
}


export const ColodaReducer = (state:InitialStateType=initialState, action: ActionsTypeForColodaReducer) => {
    switch (action.type) {
        case "WRITE-CARDS-PACK-ID":{
            return {...state,packUserId:action.payload.CardsPackId}
        }
        case "GET-CARDS-PACK-ID":{
            console.log(action.payload.data)
            return {...state,cards:action.payload.data}
        }
        default:{
            return state
        }

    }
}

export type ActionsTypeForColodaReducer=writeCardsPackIdACType | getCardsCardAC

type writeCardsPackIdACType = ReturnType<typeof writeCardsPackIdAC>
export const writeCardsPackIdAC = (CardsPackId: string) => {
    return {
        type: 'WRITE-CARDS-PACK-ID',
        payload:{CardsPackId}
    }as const
}

type getCardsCardAC=ReturnType<typeof getCardsCardAC>
export const getCardsCardAC = (data: Array<cardsType>) => {
    return {
        type: 'GET-CARDS-PACK-ID',
        payload:{data}
    }as const
}

export const getCardsCardThunk=(CardsPackId:string)=>async (dispatch:Dispatch<ActionsTypeForColodaReducer>)=>{
    try {
        let res =  await ColodaAPI.getCardsCard(CardsPackId)
        dispatch(getCardsCardAC(res.data.cards))
        console.log(res.data.cards)

    } catch {
        console.log('pizdec')
    }
}

export const addCardsCardThunk = (CardsPackId: string): AppThunk => async (dispatch) => {
    try {
         let res = await ColodaAPI.AddCardsCard(CardsPackId)
        console.log(res.data)
        dispatch(getCardsCardThunk(CardsPackId))
    } catch {
        console.log('pizdec')
    }
}


export const deleteCardscardThunk = (id: string,CardsPackId: string):AppThunk => async (dispatch) => {
    try {
        let res = await ColodaAPI.deleteCardsPack(id)
            dispatch(getCardsCardThunk(CardsPackId))
    } catch {
        console.log('pizdec')
    }
}

export const updateCardsCardThunk= (id: string,CardsPackId: string):AppThunk => async (dispatch) => {
    try {
        let res = await ColodaAPI.updateCardsPack(id)
        dispatch(getCardsCardThunk(CardsPackId))
    } catch {
        console.log('pizdec')
    }
}