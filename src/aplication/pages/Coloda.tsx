import React, {useEffect, useState} from 'react';
import {LinearProgress, Table} from "@material-ui/core";
import {Navigate, NavLink} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {cardsType, ColodaAPI} from "../../Api/ColodaAPI";
import {rootReducerType} from "../../store/store";
import {
    addCardsCardThunk,
    deleteCardscardThunk,
    getCardsCardThunk,
    InitialStateType,
    updateCardsCardThunk
} from "../../reducers/ColodaReducer";
import {ModalWindowForCreate} from "./ModalWindowForCreate";
import {ModalWindowForCreateCard} from "./ModalWindowForCreateCard";

export const Coloda = () => {
    let dispatch = useDispatch();

    let getCardsCard = useSelector<rootReducerType, Array<cardsType>>(state => state.coloda.cards)
    let CardsPackId = useSelector<rootReducerType, string>(state => state.coloda.packUserId)
    let nameFromLocalStorage = localStorage.getItem('userID')//for disabled-enabled button
    let [loading, setLoading] = useState(false);
    let [showModal, setShowModal] = useState(false);

    const onClickButtonDeleteForColodaHandler = (id: string) => {
        dispatch(deleteCardscardThunk(id, CardsPackId))
    }

    const onClickButtonUpdateForColodaHandler = (id: string) => {
        dispatch(updateCardsCardThunk(id, CardsPackId))
    }

    const onClickAddCardsCardButtonHandler = () => {
        setShowModal(true)
        // dispatch(addCardsCardThunk(CardsPackId))
    }

    useEffect(() => {
        dispatch(getCardsCardThunk(CardsPackId))
    }, [])

    if (CardsPackId === '') {
        return <Navigate to={'/'}/>
    }


    return (
        <GeneralDiv>
            {loading && <LinearProgress color="secondary"/>}
            {showModal && <ModalWindowForCreateCard setShowModal={setShowModal} title={'CREATE NEW CARDS CARD'}/>}
            <h1>COLODA</h1>
            <PanelRangeButton>
                <LeftCase>
                    <h1 style={{marginLeft: "20px"}}>Users cards / CARD</h1>
                </LeftCase>
                <RightCase>
                    <button style={{marginTop: "4%", padding: '15px'}}
                            onClick={onClickAddCardsCardButtonHandler}>Create New CardsCard
                    </button>
                </RightCase>
            </PanelRangeButton>

            <SCforTH>
                <tr>
                    <th style={{width: '24%'}}>cardsPackID</th>
                    <th style={{width: '24%'}}>user id</th>
                    <th style={{width: '24%'}}>question</th>
                    <th style={{width: '8%'}}>answer</th>
                    <th style={{width: '3,1%'}}>rating</th>
                    <th style={{width: '10%'}}>UPDATE</th>
                    <th style={{width: '10%'}}>DELETE</th>
                </tr>
            </SCforTH>
            <StylesForTable>
                <Table>
                    {getCardsCard.map(m => {
                        return (
                            <tr>
                                <SCforTDbig>
                                    <td>{m.cardsPack_id}</td>
                                </SCforTDbig>
                                <SCforTDbig>
                                    <td>{m.user_id}</td>
                                </SCforTDbig>
                                <SCforTDbig>
                                    <td>{m.question}</td>
                                </SCforTDbig>
                                <SCforTDmedium>
                                    <NavLink to={'coloda'}
                                             style={{textDecoration: 'none', color: 'black'}}>
                                        <ChangeColorForNavLink>
                                            <td>{m.answer}</td>
                                        </ChangeColorForNavLink>
                                    </NavLink>
                                </SCforTDmedium>
                                <SCforTDsmall>
                                    <td>{Math.round(m.grade)}</td>
                                </SCforTDsmall>
                                <SCforTDmedium>
                                    <td>
                                        <button onClick={() => onClickButtonUpdateForColodaHandler(m._id)}
                                                disabled={m.user_id == nameFromLocalStorage ? false : true}>UPDATE
                                        </button>
                                    </td>
                                </SCforTDmedium>
                                <SCforTDmedium>
                                    <td>
                                        <button onClick={() => onClickButtonDeleteForColodaHandler(m._id)}
                                                disabled={m.user_id == nameFromLocalStorage ? false : true}>DELETE
                                        </button>
                                    </td>
                                </SCforTDmedium>
                            </tr>
                        )
                    })}
                </Table>
            </StylesForTable>
        </GeneralDiv>
    )
}

let GeneralDiv = styled.div`
  margin-top: -20px;
  height: 550px;
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
  width: 49%;
`
const RightCase = styled.div`
  width: 49%;
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



