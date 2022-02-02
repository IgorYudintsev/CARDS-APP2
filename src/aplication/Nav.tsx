import React from 'react';
import {Button} from "@material-ui/core";
import styled from "styled-components";
import {Navigate, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {LogOutThunkCreator} from "../reducers/LoginReducer";

export const Nav = () => {
    let isLogin = useSelector<rootReducerType>(state => state.login.isLogin)
    let dispatch = useDispatch();


    const onClickHandlerForLogOut = () => {
        dispatch(LogOutThunkCreator())
    }

    return (
        <GeneralDiv>
            <DivForButton>
                <StyleForButton><Button variant="contained" color={'inherit'} size={'small'}><NavLink to={'register'}
                                                                                                      style={{textDecoration: 'none'}}>Registration</NavLink>
                </Button></StyleForButton>

                {!isLogin &&
                    <StyleForButton> <Button variant="contained" color={'inherit'} size={'small'}><NavLink to={'login'}
                                                                                                           style={{textDecoration: 'none'}}>Login</NavLink></Button>
                    </StyleForButton>}

                {isLogin && <StyleForButton> <Button variant="contained" color={'inherit'} size={'small'}
                                                     onClick={onClickHandlerForLogOut}
                                                     style={{textDecoration: 'none'}}>LogOUT</Button>
                </StyleForButton>}
                <StyleForButton><Button variant="contained" color={'inherit'} size={'small'}><NavLink to={'/'}
                                                                                                      style={{textDecoration: 'none'}}>Profile</NavLink></Button>
                </StyleForButton>
            </DivForButton>
        </GeneralDiv>
    );
};

const GeneralDiv = styled.div`
  height: 50px;
  width: 100%;
  background-color: cadetblue;
  display: flex;
  align-items: center;
`

const DivForButton = styled.div`
  margin-left: 40%;
  display: flex;
`

const StyleForButton = styled.div`
  padding: 0px 5px;
`