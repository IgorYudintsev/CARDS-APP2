import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './Search.module.css'
import {rootReducerType} from "../store/store";
import {setSearchValueAC} from "../reducers/SearchReducer";

type propsType={
    setLoading:(loading:boolean)=>void
}

const Search = (props:propsType) => {
    let dispatch = useDispatch();
    let searchSelector = useSelector<rootReducerType, string>(state => state.search.search)
    let [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        props.setLoading(true)
        const timeoutId = setTimeout(() => {
            dispatch(setSearchValueAC(searchValue))
            props.setLoading(false)
        } , 500)
        return () => clearTimeout(timeoutId)

    }, [searchValue])
    const onInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }
    return (
        <input className={style.search}
               value={searchSelector}
               placeholder={'Search...'} onChange={onInputChange}/>
    );
};

export default Search;