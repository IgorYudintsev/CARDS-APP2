import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {Button, TextField} from "@material-ui/core";
import {addCardsPackThunk} from "../../reducers/ProfileReducer";
import {useDispatch} from "react-redux";

type PropsType = {
    setShowModal: (showModal: boolean) => void
    title:string
}

export const ModalWindowForCreate = (props: PropsType) => {
    let dispatch = useDispatch();
    let[inputTitle,setInputTitle]=useState('')

    let payloadAllForGetCards = {
        //packName: inputTitle,
        // min: 1,
        // max: 10,
        //sortPacks: 'noSORT',
        //packName: inputTitle,
        page: 1,
        pageCount: 10,
        // user_id: ''
    }

    const onClickCloseHandler = () => {
        props.setShowModal(false)
    }

    const onChangeHandler=(event:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setInputTitle(event.currentTarget.value)
    }

   const onClickCreateHandler=()=>{
       //dispatch(addCardsPackThunk(payloadAllForGetCards))
       dispatch(addCardsPackThunk(payloadAllForGetCards,inputTitle))
       props.setShowModal(false)
   }

    return (
        <div>
            <BackGroundDiv onClick={onClickCloseHandler}></BackGroundDiv>
            <TextFieldDiv>
                <h1>{props.title}</h1>
                <TextField id="outlined-basic" label="Name of cards pack" variant="outlined" onChange={onChangeHandler}/>
                <div style={{marginTop:'30px'}}>
                    <Button variant="contained" onClick={onClickCreateHandler}>Create</Button>
                    <Button variant="contained" color="error" style={{marginLeft:'10px'}} onClick={onClickCloseHandler}>Close</Button>
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