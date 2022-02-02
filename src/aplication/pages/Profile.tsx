import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {AuthMeThunk} from "../../reducers/LoginReducer";
import {Navigate} from 'react-router-dom';


export const Profile = () => {
    //ping
    // useEffect(()=>{
    //    AuthApi.getPing().then((res)=>{
    //        console.log(res)
    //    })
    // },[])
    let dispatch = useDispatch();

    let [authMe, setAuthMe] = useState(false)
    let [error, setError] = useState(null)


    let isLogin = useSelector<rootReducerType>(state => state.login.isLogin)

    // useEffect(() => {
    //     dispatch(AuthMeThunk(setAuthMe, setError))
    // }, [])

    // useEffect(() => {
    //     if (!isLogin) {
    //         dispatch(AuthMeThunk(setAuthMe, setError))
    //     }
    // }, [])


    // if (!isLogin) {
    //     dispatch(AuthMeThunk(setAuthMe, setError))
    // }
    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div>Profile</div>
    );
};

