import React, {useState} from 'react';
import style from "./Paginator.module.css";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {getCardPacks} from "../Api/ProfileApi";
import {getCardsPackForPaginationThunk} from "../reducers/ProfileReducer";
import styled from "styled-components";


type propsType = {
    minPagePagination: number
    maxPagePagination: number
}

export const Paginator = () => {
    let dispatch = useDispatch()
    let getCardsPack = useSelector<rootReducerType, getCardPacks>(state => state.profile)
    let [minPagePagination, setMinPagePagination] = useState(1)//for pagination
    let [maxPagePagination, setMaxPagePagination] = useState(10)
    let maxPageFromServer = Math.ceil(getCardsPack.cardPacksTotalCount / getCardsPack.pageCount)//maxNumber of pages
    let arrForPagination = [];
    for (let i = minPagePagination; i <= maxPagePagination; i++) {
        arrForPagination.push(i)
    }

    const onclickHandlerForpagination = (page: number) => {
        dispatch(getCardsPackForPaginationThunk(page))
    }

    const leftArrowForPaginationHandler = () => {
        setMinPagePagination(minPagePagination - 10)
        setMaxPagePagination(maxPagePagination - 10)
        if (maxPagePagination + 10 >= maxPageFromServer) {
            setMinPagePagination(minPagePagination - 10)
            setMaxPagePagination(minPagePagination - 1)
            dispatch(getCardsPackForPaginationThunk(minPagePagination - 1))
        }
        if (maxPagePagination + 10 <= maxPageFromServer) {  //для перерисовки карточек, когда нажимаем стрелку
            dispatch(getCardsPackForPaginationThunk(maxPagePagination - 10))
        }
    }

    const rightArrowForPaginationHandler = () => {
        if (minPagePagination + 10 >= 11) {  //для перерисовки карточек, когда нажимаем стрелку
            dispatch(getCardsPackForPaginationThunk(minPagePagination + 10))
        }
        setMinPagePagination(minPagePagination + 10)
        setMaxPagePagination(maxPagePagination + 10)
        if (maxPagePagination + 10 >= maxPageFromServer) {
            let maxPage = maxPagePagination - maxPageFromServer
            setMaxPagePagination(maxPagePagination - maxPage)
        }
    }

    return (
        <PaginatorGeneralStyle>
            <button className={style.arrowHover} onClick={leftArrowForPaginationHandler}
                    disabled={minPagePagination == 1 ? true : false}>{`${`<`}`}</button>
            <span className={style.generalForPagination}>
              {arrForPagination.map(m => {
                  return (
                      <span onClick={() => onclickHandlerForpagination(m)}
                            className={getCardsPack.page === m ? style.ActivePaginationBlock : style.paginationBlock}>{` ${m} `}</span>
                  )
              })}
        </span>
            <button className={style.arrowHover} onClick={rightArrowForPaginationHandler}
                    disabled={maxPagePagination >= maxPageFromServer ? true : false}>{`${`>`}`}</button>
        </PaginatorGeneralStyle>

    );
};

let PaginatorGeneralStyle = styled.div`
  margin-left: 65%;
  margin-top: 30px;
`