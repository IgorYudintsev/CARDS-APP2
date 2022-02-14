import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styles from "./DoubleRange.module.css";

import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../store/store";
import {getCardsPackThunk} from "../reducers/ProfileReducer";



function valuetext(value: number) {
    return `${value}°C`;
}

type PropsType = {
    min: number
    max: number
}

export let DoubleRange = React.memo((props: PropsType) => {
    let dispatch = useDispatch()
    let getCardsPack = useSelector<rootReducerType>(state => state.profile)
    const [value, setValue] = React.useState<number[]>([props.min, props.max]);
    let payloadAllForGetCards = {
        // packName: 'It-patsan',
        min:  value[0],
        max: value[1],
        //sortPacks: 'noSORT',
        // packName: searchSelector,
        page: 1,
        pageCount: 10,
        // user_id: ''
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(getCardsPackThunk(payloadAllForGetCards))
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [value])

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };


    return (
        <span className={styles.range}>

                <Typography id="range-slider" gutterBottom>cardsCount</Typography>
                <Slider
                    value={value}
                    min={props.min}
                    max={props.max}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                    color="primary"
                    size={'small'}
                />

        </span>
    );
})