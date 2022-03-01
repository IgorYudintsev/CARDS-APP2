import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {Button, TextField} from "@material-ui/core";
import {addCardsPackThunk} from "../../reducers/ProfileReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {addCardsCardThunk} from "../../reducers/ColodaReducer";

type PropsType = {
    setShowModal: (showModal: boolean) => void
    title: string
}

export const ModalWindowForCreateCard = (props: PropsType) => {
    let dispatch = useDispatch();
    let CardsPackId = useSelector<rootReducerType, string>(state => state.coloda.packUserId)
    let [inputTitle, setInputTitle] = useState('')
    let [inputTitle2, setInputTitle2] = useState('')

    const onClickCloseHandler = () => {
        props.setShowModal(false)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)
    }

    const onChangeAnswerHandler = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInputTitle2(event.currentTarget.value)
    }

    const onClickCreateHandler = () => {
        dispatch(addCardsCardThunk(CardsPackId,inputTitle,inputTitle2))
        //dispatch(addCardsPackThunk(payloadAllForGetCards,inputTitle))
        props.setShowModal(false)
    }

    return (
        <div>
            <BackGroundDiv onClick={onClickCloseHandler}></BackGroundDiv>
            <TextFieldDiv>
                <h1>{props.title}</h1>
                <div style={{marginBottom:'10px'}}>
                    <TextField id="outlined-basic" label="question" variant="outlined" onChange={onChangeHandler}/>
                </div>
                <div>
                    <TextField id="outlined-basic" label="answer" variant="outlined" onChange={onChangeAnswerHandler}/>
                </div>
                <div style={{marginTop: '30px'}}>
                    <Button variant="contained" onClick={onClickCreateHandler}>Create</Button>
                    <Button variant="contained" color="error" style={{marginLeft: '10px'}}
                            onClick={onClickCloseHandler}>Close</Button>
                </div>
            </TextFieldDiv>
        </div>
    );
};

const BackGroundDiv = styled.div`
  width: 100%;
  height: 91vh;
  position: absolute;
  background-color: #282c34;
  opacity: 0.5;
  z-index: 1;
`

const TextFieldDiv = styled.div`
  margin-left: 20%;
  margin-top: 5%;
  width: 60%;
  height: 60%;
  position: absolute;
  background-color: white;
  z-index: 2;
`