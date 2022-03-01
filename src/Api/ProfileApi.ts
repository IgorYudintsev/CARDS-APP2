import axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const ProfileApi = {
    getCardsPack: (payload: any) => {
        return instance.get<getCardPacks>('/cards/pack', {params: {...payload}})
    },
    addCardsPack: (name:any) => {
        console.log(name)
        return instance.post<addCardsPackType>('/cards/pack', {cardsPack: {name:name}})
        // return instance.post<addCardsPackType>('/cards/pack', {cardsPack: {}})
    },
    updateCardsPack:(id:string,inputTitle:string)=>{
        return instance.put(`cards/pack`,{cardsPack:{_id:id,name: inputTitle}})
    },
    deleteCardsPack: (id: string) => {
        return instance.delete(`/cards/pack?id=${id}`)
    },
    GETCardsPackForPagination: (pagePageCount: SearchParamsType = {}) => {
        return instance.get<getCardPacks>('cards/pack', {params: {...pagePageCount}})
    },
}

export type SearchParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

export type getCardPacks = {
    cardPacks: Array<cardPackDATA>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    // tokenDeathTime: number
}

export type addCardsPackType = {
    newCardsPack: cardPackDATA
    token: string
    tokenDeathTime: number
}

export type cardPackDATA = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

// export type userType = {
//     cardsCount: number
//     created: string
//     grade: number
//     more_id: string
//     name: string
//     path: string
//     private: boolean
//     rating: number
//     shots: number
//     type: string
//     updated: string
//     user_id: string
//     user_name: string
//     __v: number
//     _id: string
// }
// export type CardPacksType = {
//     cardPacks: Array<userType>
//     cardPacksTotalCount: number
//     maxCardsCount: number
//     minCardsCount: number
//     page: number
//     pageCount: number
// }