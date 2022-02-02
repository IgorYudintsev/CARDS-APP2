import axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const ProfileApi = {
    getCardsPack: (payload:any) => {
        return instance.get<getCardPacks>('/cards/pack')
    }

}

type getCardPacks={
    cardPacks:cardPackDATA
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type cardPackDATA={
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

