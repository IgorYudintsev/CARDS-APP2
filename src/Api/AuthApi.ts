import axios from "axios";

let instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
})

export const AuthApi = {
    getPing: () => {
        return instance.get('/ping')
    },
    authRegister: (payload: { email: string, password: string }) => {
        return instance.post<DataType>('/auth/register', {email: payload.email, password: payload.password})
    },
    authLogin: (payload: { email: string, password: string, rememberMe: boolean }) => {
        return instance.post<DataType>('/auth/login', {
            email: payload.email,
            password: payload.password,
            rememberMe: payload.rememberMe
        })
    },
    authMe: () => {
        return instance.post<AuthMeType>('/auth/me',{}) //проверяет куку, есои все ок, то редирект на Profile
    },
    authLogOut: () => {
        return instance.delete('/auth/me')
    },
    authRecoveryPassword: (payload: { email: string, from: any, message: string }) => {
        return instance.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {
            email: payload.email,
            from: payload.from,
            message: `<div style="background-color: lime; padding: 15px"> To change your password, please follow the link:<a href='http://localhost:3000/newPas/$token$'>link</a></div>`
        }, {withCredentials: true})
    },
    authNewPassword: (payload: { password: string, resetPasswordToken: string }) => {
        return instance.post('/auth/set-new-password', {
            password: payload.password,
            resetPasswordToken: payload.resetPasswordToken
        })
    }
}


export type RequestType = {
    config: any,
    data: DataType,
    headers: any,
    request: any,
    status: number
    statusText: string
}


export type DataType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    token: string
    tokenDeathTime: number
    __v: number
    _id: string
    error?: string
}

export type AuthMeType={
    _id: string,
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
