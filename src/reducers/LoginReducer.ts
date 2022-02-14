import {Dispatch} from "redux";
import {AuthApi, AuthMeType, DataType} from "../Api/AuthApi";


let initialState = {
    isLogin: false
}

export type InitialStateType = typeof initialState

export const LoginReducer = (state: InitialStateType = initialState, action: ActionsTypeForLoginReducer): InitialStateType => {
    switch (action.type) {
        case 'LOG-IN': {
            return {...action.payload, isLogin: action.isLogin}
        }
        case "AUTH-ME": {
            return {...action.data, isLogin: true}
        }
        case "LOG-OUT": {
            // return {...state,isLogin: action.payload.value}
            return {isLogin: false}
        }
        default:
            return state
    }
}

export type ActionsTypeForLoginReducer = logInACType | LogOutACType | AuthMeACType

export const authRegisterThunk = (payload: { email: string, password: string },
                                  setLoading: (loading: boolean) => void,
                                  setError: (error: null) => void,
                                  setIsRegistered: (isRegistered: boolean) => void,
                                  setDisabled: (disabled: boolean) => void
) => async (dispatch: Dispatch) => {
    try {
        let res = await AuthApi.authRegister(payload)
        setIsRegistered(true)

    } catch (err: any) {
        setError(err.response?.data.error)
    } finally {
        setLoading(false)
        setDisabled(false)
    }
}


type logInACType = ReturnType<typeof logInAC>
export const logInAC = (payload: DataType, isLogin: boolean) => {
    return {
        type: 'LOG-IN',
        payload, isLogin
    } as const
}

// export const logInThunkCreator = (payload: { email: string, password: string, rememberMe: boolean }) =>
// (dispatch: Dispatch) => {
//     AuthApi.authLogin(payload)
//         .then((res) => {
//             dispatch(logInAC(res.data))
//         })
//
//     // .catch((err: AxiosError) => {
//     //      console.log(err.response?.data.error)
//     //      console.log((err as Error).message)
//     // })
//     // .finally(() => console.log('error'))
// }


//                 через async await
// export const logInThunkCreator = (payload: { email: string, password: string, rememberMe: boolean }) =>
//     async (dispatch: Dispatch) => {
//         try {
//             let res = await AuthApi.authLogin(payload)
//             dispatch(logInAC(res.data, true))
//         } catch (err: any) {
//             console.log((err as Error).message)
//         } finally {
//             console.log('error')
//         }
//     }


export const logInThunkCreator = (payload: { email: string, password: string, rememberMe: boolean },
                                  setLoading: (loading: boolean) => void,
                                  setError: (error: null) => void,
                                  setDisabled: (disabled: boolean) => void) =>
    async (dispatch: Dispatch) => {
        try {
            let res = await AuthApi.authLogin(payload)
            dispatch(logInAC(res.data, true))
            dispatch(logInAC(res.data, true))
        } catch (err: any) {
            setError(err.response?.data.error)
            console.log((err as Error).message)
        } finally {
            setLoading(false)
            setDisabled(false)
        }
    }

type AuthMeACType = ReturnType<typeof AuthMeAC>

export const AuthMeAC = (data: AuthMeType) => {
    return {
        type: 'AUTH-ME',
        data
    } as const
}

export const AuthMeThunk = (setLoading: (loading: boolean) => void) => async (dispatch: Dispatch) => {
    try {
        let res = await AuthApi.authMe();
        dispatch(AuthMeAC(res.data))
    } catch (err: any) {
    } finally {
        setLoading(false)
    }
}


type LogOutACType = ReturnType<typeof LogOutAC>
export const LogOutAC = (value: boolean) => {
    return {
        type: 'LOG-OUT',
        payload: {value}
    } as const
}
export const LogOutThunkCreator = () => async (dispatch: Dispatch) => {
    try {
        let res = await AuthApi.authLogOut()
        dispatch(LogOutAC(false))
        console.log(res)
    } catch (err: any) {
        console.log(err)
    }
}

export const ForgotpasswordThunkCreator = (
    payload: { email: string, from: string, message: string },
    setCheckEmail: (checkEmail: boolean) => void,
    setLoading: (loading: boolean) => void,
    setDisabled: (disabled: boolean) => void
) => async (dispatch: Dispatch) => {
    try {
        let res = await AuthApi.authRecoveryPassword(payload)
        setCheckEmail(true)
        console.log(res)
    } catch (err: any) {
        console.log(err)
    } finally {
        setLoading(false)
        setDisabled(false)
    }
}

export const newPasswordThunkCreator = (
    payload: { password: string, resetPasswordToken: any },
    setLoading: (loading: boolean) => void,
    setRedirect: (redirect: boolean) => void,
    setDisabled: (disabled: boolean) => void,
    setError: (error: null) => void
) => async (dispatch: Dispatch) => {
    try {
        let res = await AuthApi.authNewPassword(payload)
        setRedirect(true)
        console.log(res)
    } catch (err: any) {
        setError(err.response?.data.error)
    } finally {
        setLoading(false)
        setDisabled(false)
    }
}