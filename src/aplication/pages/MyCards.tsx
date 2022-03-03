// import React, {useEffect, useState} from 'react';
// import {Box, Button, LinearProgress, Paper, Rating} from "@material-ui/core";
//
// import styled from "styled-components";
// import Typography from "@material-ui/core/Typography";
// import {useDispatch, useSelector} from "react-redux";
// import {rootReducerType} from "../../store/store";
// import {cardsType} from "../../Api/ColodaAPI";
// import {getCardsCardThunk, gradeCardsThunk} from "../../reducers/ColodaReducer";
// import {Navigate, useParams} from "react-router-dom";
//
// export const MyCards = () => {
//     let [goToProfile, setGoToProfile] = useState(false)
//     let [loading, setLoading] = useState(false);
//     let dispatch = useDispatch();
//     // подтягиваем данные из Редюсера
//     let getCardsCard = useSelector<rootReducerType, Array<cardsType>>(state => state.coloda.cards)
//     //let randomCard=(Math.ceil(Math.random() * getCardsCard.length - 1))
//     let [randomCard, setRandomCard] = useState(Math.ceil(Math.random() * getCardsCard.length - 1))
//
//
//     // по умолчанию null, но после запроса возьмет данные из редюсера
//     const [newValue, setNewValue] = useState<number | null>(null)
//
//     // взяли id, которая к нам пришла из NavLink
//     const {id} = useParams<'id'>();
//
//     // когда пришел id (id &&), бери данные в редюсере
//     useEffect(() => {
//         id && dispatch(getCardsCardThunk(id))
//     }, [])
//
//     // когда массив в редюсере не пустой...
//     useEffect(() => {
//         if (getCardsCard.length !== 0) {
//             setNewValue(getCardsCard[randomCard].grade)
//         }
//     }, [getCardsCard])
//
//
//     if (getCardsCard.length === 0) {
//         // return <LinearProgress color="secondary"/>
//         return <div>Loading</div>
//     }
//
//
//     const sendStarsHandler = (grade: number) => {
//         dispatch(gradeCardsThunk(grade, getCardsCard[randomCard]._id))
//         setRandomCard(Math.ceil(Math.random() * getCardsCard.length - 1))
//     }
//
//
//     const navigateToProfile = () => {
//         setGoToProfile(true)
//     }
//     if (goToProfile) {
//         return <Navigate to={'/'}/>
//     }
//
//
//     return (
//         <>
//             {/*{loading && <LinearProgress color="secondary"/>}*/}
//             <div style={{marginLeft: '15%'}}>
//                 <GeneralDiv style={{width: "85%", height: "65%"}}>
//                     <Paper style={{padding: '30px'}}>
//                         <div style={{position: 'relative'}}>
//                             <Button onClick={navigateToProfile} variant="contained" color="error"
//                                     style={{position: 'absolute', right: '0%', top: "-25px"}}>X</Button>
//                             <h1>MyCards</h1>
//                             <div>question: {getCardsCard[randomCard].question}</div>
//                             <div>answer: {getCardsCard[randomCard].answer}</div>
//                             <Typography component="legend">Controlled</Typography>
//                             <Rating
//                                 name="simple-controlled"
//                                 value={getCardsCard[randomCard].grade}
//                                 onChange={(event, newValue) => {
//                                     setNewValue(newValue);
//                                 }}
//                             />
//                             <p>
//                                 <Button onClick={() => sendStarsHandler(1)} variant="contained" color="error">I don't
//                                     know</Button>
//                                 <Button onClick={() => sendStarsHandler(2)} variant="contained"
//                                         style={{backgroundColor: 'orange'}}>I forgot</Button>
//                                 <Button onClick={() => sendStarsHandler(3)} variant="contained">I try to
//                                     remember</Button>
//                                 <Button onClick={() => sendStarsHandler(4)} variant="contained"
//                                         style={{backgroundColor: 'yellowgreen'}}>I confuse</Button>
//                                 <Button onClick={() => sendStarsHandler(5)} variant="contained" color="success">I
//                                     know</Button>
//                             </p>
//                         </div>
//                     </Paper>
//                 </GeneralDiv>
//             </div>
//         </>
//     );
// };
//
// const GeneralDiv = styled.div`
//   margin-top: 35px;
// `
//-----------------------------------------------------------------------------------------------
import React, {useEffect, useState} from 'react';
import {Box, Button, LinearProgress, Paper, Rating} from "@material-ui/core";

import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {cardsType} from "../../Api/ColodaAPI";
import {getCardsCardThunk} from "../../reducers/ColodaReducer";
import {Navigate, useParams} from "react-router-dom";

export const MyCards = () => {
    let [goToProfile, setGoToProfile] = useState(false)
    let [loading, setLoading] = useState(false);
    let[reloadPage,setReloadPage]=useState(0)
    console.log('reloadPage:' +reloadPage)
    let dispatch = useDispatch();
    // подтягиваем данные из Редюсера
    let getCardsCard = useSelector<rootReducerType, Array<cardsType>>(state => state.coloda.cards)
    let randomCard=(Math.ceil(Math.random() * getCardsCard.length - 1))


    // по умолчанию null, но после запроса возьмет данные из редюсера
    const [newValue, setNewValue] = useState<number | null>(null)

    // взяли id, которая к нам пришла из NavLink
    const {id} = useParams<'id'>();

    // когда пришел id (id &&), бери данные в редюсере
    useEffect(() => {
        id && dispatch(getCardsCardThunk(id))
        }, [])

    // когда массив в редюсере не пустой...
    useEffect(() => {
        if (getCardsCard.length !== 0) {
            setNewValue(getCardsCard[randomCard].grade)

        }
    }, [getCardsCard,reloadPage])


    if (getCardsCard.length === 0) {
        return <LinearProgress color="secondary"/>
    }


    const sendStarsHandler=(star:number)=>{
        console.log(star)
        setReloadPage(Math.random())
    }


    const navigateToProfile = () => {
        setGoToProfile(true)
    }
    if (goToProfile) {
        return <Navigate to={'/'}/>
    }


    return (
        <>
            {/*{loading && <LinearProgress color="secondary"/>}*/}
            <div style={{marginLeft: '15%'}}>
                <GeneralDiv style={{width: "85%", height: "65%"}}>
                    <Paper style={{padding: '30px'}}>
                        <div style={{position: 'relative'}}>
                            <Button onClick={navigateToProfile} variant="contained" color="error"
                                    style={{position: 'absolute', right: '0%', top: "-25px"}}>X</Button>
                            <h1>MyCards</h1>
                            <div>question: {getCardsCard[randomCard].question}</div>
                            <div>answer: {getCardsCard[randomCard].answer}</div>
                            <Typography component="legend">Controlled</Typography>
                            <Rating
                                name="simple-controlled"
                                value={getCardsCard[randomCard].grade}
                                onChange={(event, newValue) => {
                                    setNewValue(newValue);
                                }}
                            />
                            <p>
                                <Button onClick={() => sendStarsHandler(1)} variant="contained" color="error">I don't know</Button>
                                <Button onClick={() => sendStarsHandler(2)} variant="contained" style={{backgroundColor: 'orange'}}>I forgot</Button>
                                <Button onClick={() => sendStarsHandler(3)} variant="contained">I try to remember</Button>
                                <Button onClick={() => sendStarsHandler(4)} variant="contained" style={{backgroundColor: 'yellowgreen'}}>I confuse</Button>
                                <Button onClick={() => sendStarsHandler(5)} variant="contained" color="success">I know</Button>
                            </p>
                        </div>
                    </Paper>
                </GeneralDiv>
            </div>
        </>
    );
};

const GeneralDiv = styled.div`
  margin-top: 35px;
`


//--------------------------------------------------------------------------
// import React, {useEffect, useState} from 'react';
// import {Box, Button, LinearProgress, Paper, Rating} from "@material-ui/core";
//
// import styled from "styled-components";
// import Typography from "@material-ui/core/Typography";
// import {useDispatch, useSelector} from "react-redux";
// import {rootReducerType} from "../../store/store";
// import {cardsType} from "../../Api/ColodaAPI";
// import {getCardsCardThunk} from "../../reducers/ColodaReducer";
// import {Navigate, useParams} from "react-router-dom";
//
// export const MyCards = () => {
//     let [goToProfile, setGoToProfile] = useState(false)
//     let [loading, setLoading] = useState(false);
//     let dispatch = useDispatch();
//     // подтягиваем данные из Редюсера
//     let getCardsCard = useSelector<rootReducerType, Array<cardsType>>(state => state.coloda.cards)
//     let randomCard=(Math.ceil(Math.random() * getCardsCard.length - 1))
//
//
//     // по умолчанию null, но после запроса возьмет данные из редюсера
//     const [newValue, setNewValue] = useState<number | null>(null)
//
//     // взяли id, которая к нам пришла из NavLink
//     const {id} = useParams<'id'>();
//
//     // когда пришел id (id &&), бери данные в редюсере
//     useEffect(() => {
//         id && dispatch(getCardsCardThunk(id))
//     }, [])
//
//     // когда массив в редюсере не пустой...
//     useEffect(() => {
//         if (getCardsCard.length !== 0) {
//             setNewValue(getCardsCard[randomCard].grade)
//         }
//     }, [getCardsCard])
//
//
//     if (getCardsCard.length === 0) {
//         return <LinearProgress color="secondary"/>
//     }
//
//
//     const sendStarsHandler=(star:number)=>{
//
//     }
//
//
//     const navigateToProfile = () => {
//         setGoToProfile(true)
//     }
//     if (goToProfile) {
//         return <Navigate to={'/'}/>
//     }
//
//
//     return (
//         <>
//             {/*{loading && <LinearProgress color="secondary"/>}*/}
//             <div style={{marginLeft: '15%'}}>
//                 <GeneralDiv style={{width: "85%", height: "65%"}}>
//                     <Paper style={{padding: '30px'}}>
//                         <div style={{position: 'relative'}}>
//                             <Button onClick={navigateToProfile} variant="contained" color="error"
//                                     style={{position: 'absolute', right: '0%', top: "-25px"}}>X</Button>
//                             <h1>MyCards</h1>
//                             <div>question: {getCardsCard[randomCard].question}</div>
//                             <div>answer: {getCardsCard[randomCard].answer}</div>
//                             <Typography component="legend">Controlled</Typography>
//                             <Rating
//                                 name="simple-controlled"
//                                 value={getCardsCard[randomCard].grade}
//                                 onChange={(event, newValue) => {
//                                     setNewValue(newValue);
//                                 }}
//                             />
//                             <p>
//                                 <Button variant="contained" color="error">I don't know</Button>
//                                 <Button variant="contained" style={{backgroundColor: 'orange'}}>I forgot</Button>
//                                 <Button variant="contained">I try to remember</Button>
//                                 <Button variant="contained" style={{backgroundColor: 'yellowgreen'}}>I confuse</Button>
//                                 <Button onClick={()=>sendStarsHandler(5)} variant="contained" color="success">I know</Button>
//                             </p>
//                         </div>
//                     </Paper>
//                 </GeneralDiv>
//             </div>
//         </>
//     );
// };
//
// const GeneralDiv = styled.div`
//   margin-top: 35px;
// `