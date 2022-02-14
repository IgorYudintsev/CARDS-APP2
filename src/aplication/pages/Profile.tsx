import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {Navigate, NavLink} from 'react-router-dom';
import {getCardPacks} from "../../Api/ProfileApi";
import {AuthMeThunk} from "../../reducers/LoginReducer";
import {LinearProgress, Pagination, Table} from "@material-ui/core";
import {
    addCardsPackThunk,
    deleteCardsPackThunk, getCardsPackForPaginationThunk,
    getCardsPackThunk,
    updateCardsPackThunk
} from "../../reducers/ProfileReducer";
import styled from "styled-components";
import {writeCardsPackIdAC} from "../../reducers/ColodaReducer";
import style from "./../../components/Paginator.module.css";
import {Paginator} from "../../components/Paginator";
import Search from "../../components/Search";
import {setSearchValueAC} from "../../reducers/SearchReducer";
import { DoubleRange } from '../../components/DoubleRange';

export type payloadForGetCardsType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: string,
    page: number,
    pageCount: number,
    user_id?: string | null
}


export const Profile = () => {
    //ping
    // useEffect(()=>{
    //    AuthApi.getPing().then((res)=>{
    //        console.log(res)
    //    })
    // },[])
    let dispatch = useDispatch();
    let isLogin = useSelector<rootReducerType>(state => state.login.isLogin)
    let getCardsPack = useSelector<rootReducerType, getCardPacks>(state => state.profile)
    let nameFromLocalStorage = localStorage.getItem('userID')//for disabled-enabled button
    let [loading, setLoading] = useState(false);
    let [colorForButton, setcolorForButton] = useState('all')
    let searchSelector = useSelector<rootReducerType, string>(state => state.search.search)

    let payloadAllForGetCards = {
        // packName: 'It-patsan',
        // min: 1,
        // max: 10,
        //sortPacks: 'noSORT',
        packName: searchSelector,
        page: 1,
        pageCount: 10,
        // user_id: ''
    }
    let payloadMyCardsForGetCards = {
        //packName: 'IT-PATSAN',
        // min: 1,
        // max: 10,
        // sortPacks: 'noSORT',
        page: 1,
        pageCount: 10,
        user_id: nameFromLocalStorage
    }

    useEffect(() => {
        if (!isLogin) {
            setLoading(false)
            dispatch(AuthMeThunk(setLoading))
        }
    }, [])

    useEffect(() => {
        if (isLogin) {
            dispatch(getCardsPackThunk(payloadAllForGetCards))
        }
    }, [searchSelector]) //следит за searchSelector в payloadAllForGetCards{packName: searchSelector}

    const onClickButtonDeleteHandler = (id: string) => {
        dispatch(deleteCardsPackThunk(id, payloadMyCardsForGetCards))
    }

    const onClickButtonUpdateHandler = (id: string) => {
        dispatch(updateCardsPackThunk(id, payloadMyCardsForGetCards))
    }

    const onClickAddCardsPackButtonHandler = () => {
        dispatch(addCardsPackThunk(payloadAllForGetCards))
    }

    const onClickButtonAllHandler = () => {
        setcolorForButton('all')
        dispatch(getCardsPackThunk(payloadAllForGetCards))
    }

    const onClickButtonMyCardsHandler = () => {
        setcolorForButton('myCards')
        dispatch(getCardsPackThunk(payloadMyCardsForGetCards))
    }

    const onClickGotoColodaHandler = (CardsPackId: string) => {
        dispatch(writeCardsPackIdAC(CardsPackId))
    }

    if (!isLogin) {
        return <Navigate to={'/login'}/>
    }

    return (
        <GeneralDiv>
            {loading && <LinearProgress color="secondary"/>}
            <h1>Profile</h1>
            <PanelRangeButton>
                <LeftCase>
                    <h1 style={{marginLeft: "20px"}}>Users cards / PROFILE</h1>
                    <button style={{
                        height: '30px',
                        marginTop: "30px",
                        marginLeft: "20px",
                        backgroundColor: colorForButton === 'all' ? 'skyblue' : ''
                    }}
                            onClick={onClickButtonAllHandler}>ALL
                    </button>
                    <button style={{
                        height: '30px',
                        marginTop: "30px",
                        marginLeft: "5px",
                        backgroundColor: colorForButton === 'myCards' ? 'skyblue' : ''
                    }}
                            onClick={onClickButtonMyCardsHandler}>MY CARDS
                    </button>
                    <>
                        <SearchStyle>
                            <Search setLoading={setLoading}/>
                        </SearchStyle>
                        <DoubleRange min={0} max={100}/>
                    </>
                </LeftCase>
                <RightCase>
                    <button style={{marginTop: "4%", padding: '15px'}}
                            onClick={onClickAddCardsPackButtonHandler}>Create
                        New CarrdsPack
                    </button>
                </RightCase>
            </PanelRangeButton>

            <SCforTH>
                <tr>
                    <th style={{width: '24%'}}>id</th>
                    <th style={{width: '24%'}}>user id</th>
                    <th style={{width: '24%'}}>created</th>
                    <th style={{width: '8%'}}>name</th>
                    <th style={{width: '3,1%'}}>cards</th>
                    <th style={{width: '10%'}}>UPDATE</th>
                    <th style={{width: '10%'}}>DELETE</th>
                </tr>
            </SCforTH>

            <StylesForTable>
                <Table>
                    {getCardsPack.cardPacks.map(m => {
                        return (
                            <tr>
                                <SCforTDbig>
                                    <td>{m._id}</td>

                                </SCforTDbig>
                                <SCforTDbig>
                                    <td>{m.user_id}</td>
                                </SCforTDbig>
                                <SCforTDbig>
                                    <td>{m.created}</td>
                                </SCforTDbig>
                                <SCforTDmedium>
                                    <NavLink to={'coloda'}
                                             style={{textDecoration: 'none', color: 'black'}}>
                                        <ChangeColorForNavLink>
                                            <td onClick={() => onClickGotoColodaHandler(m._id)}>{m.name}</td>
                                        </ChangeColorForNavLink>
                                    </NavLink>
                                </SCforTDmedium>
                                <SCforTDsmall>
                                    <td>{m.cardsCount}</td>
                                </SCforTDsmall>
                                <SCforTDmedium>
                                    <td>
                                        <button onClick={() => onClickButtonUpdateHandler(m._id)}
                                                disabled={m.user_id == nameFromLocalStorage ? false : true}>UPDATE
                                        </button>
                                    </td>
                                </SCforTDmedium>
                                <SCforTDmedium>
                                    <td>
                                        <button onClick={() => onClickButtonDeleteHandler(m._id)}
                                                disabled={m.user_id == nameFromLocalStorage ? false : true}>DELETE
                                        </button>
                                    </td>
                                </SCforTDmedium>
                            </tr>
                        )
                    })}
                </Table>

            </StylesForTable>
            <Paginator/>
        </GeneralDiv>
    )
}

let GeneralDiv = styled.div`
  margin-top: -10px;
  height: 100%;
  width: 100%;
  background-color: darkslategrey;
`

const PanelRangeButton = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
`
const LeftCase = styled.div`
  display: flex;
  width: 69%;
`
const RightCase = styled.div`
  width: 31%;
`

let SCforTH = styled.div`
  background-color: white;
`

let StylesForTable = styled.div`
  tr:nth-child(even) {
    background-color: skyblue;
    width: 100px;
  }

  border: solid white 2px;
  margin: 0px 5px;
`

let SCforTDbig = styled.td`
  border: solid white 1px;
  width: 17%;
  padding-left: 3.5%;
`
let SCforTDmedium = styled.td`
  border: solid white 1px;
  width: 7%;
  padding-left: 2%;
`
let SCforTDsmall = styled.td`
  border: solid white 1px;
  width: 2%;
  padding-left: 1%;
`

let ChangeColorForNavLink = styled.td`
  td:hover {
    color: white
  }
`

let SearchStyle = styled.div`
  margin-top: 15px;
  margin-left: 20px;
  margin-bottom: 30px;
`
