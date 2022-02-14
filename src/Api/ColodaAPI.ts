import axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const ColodaAPI = {
    getCardsCard: (CardsPackId: string) => {
        return instance.get<getCardsCardType>(`cards/card?cardsPack_id=${CardsPackId}`)
    },

    // addCardsPack: () => {
    //     return instance.post<addCardsCardType>('/cards/card', {card: {}})
    //     // return instance.post<addCardsPackType>('/cards/pack', {params: {cardsPack_id:cardsPack_id}})
    // },


    AddCardsCard: (CardsPackId: string) => {
        return instance.post(`cards/card?cardsPack_id=${CardsPackId}`, {card: {cardsPack_id: CardsPackId}})
    },


    updateCardsPack:(id:string)=>{
        return instance.put(`cards/card`,{card:{_id:id,question: "new question" }})
    },
    deleteCardsPack: (id: string) => {
        return instance.delete(`/cards/card?id=${id}`)
    }
}

export type getCardsCardType = {
    cards: Array<cardsType>,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: ""
}

export type cardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}


export type addCardsCardType = {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
    shots: number
    rating: number
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
    type: string
}


