import React, {useEffect, useState} from 'react'
import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid, IconButton, Input, InputAdornment, InputLabel,
    LinearProgress,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {Navigate} from 'react-router-dom';
import {AuthMeThunk, logInThunkCreator} from "../../reducers/LoginReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {Visibility, VisibilityOff} from "@material-ui/icons";


type FormikErrorType = {
    email?: string
    password1?: string
    password2?: string
}

//------------------------------------ для поля password поля----------------------------------
type State = {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

export const Login = () => {
    let [error, setError] = useState(null)
    let [loading, setLoading] = useState(false)
    let [forgotPasswordValue, setForgotPasswordValue] = useState(false)
    let [disabled, setDisabled] = useState(false)

    let dispatch = useDispatch();
    let isLogin = useSelector<rootReducerType>(state => state.login.isLogin)

    // если isLogin в Редаксе false, то отправить запрос на сервер для проверки куки-> если ок то заполнить Редакс данными
    useEffect(() => {
        if (!isLogin) {
            dispatch(AuthMeThunk(setError))
        }
    }, [])


    const formik = useFormik({
        initialValues: {
            email: '',
            password1: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            setError(null)//у нас в случае 400 вылетает error. а блягодаря этой строке, как только начали что-то поновой вписывать в поле-всплыващка исчезает
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password1) {
                errors.password1 = 'Поле пароль обязательно';
            } else if (values.password1.length < 2) {
                errors.password1 = 'Must be 3 characters or less';
            }
            return errors;
        },
        onSubmit: (values) => {
            setLoading(true)
            setDisabled(true)
            let payload = {email: values.email, password: values.password1, rememberMe: values.rememberMe}
            dispatch(logInThunkCreator(payload, setLoading, setError, setDisabled))
        },
    })


    // -----------------------для поля password поля values,handleClickShowPassword,handleMouseDownPassword
    const [values, setValues] = useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    //если зарегистрировался, переходим на profile
    if (isLogin) {
        return <Navigate to={'/'}/>
    }
    if (!isLogin) {

    }

    if (forgotPasswordValue) {
        return <Navigate to={'/forgotPassword'}/>
    }

    const onClickHandlerForForgotPassword = () => { //for ForgotPassword
        setForgotPasswordValue(true)
    }

    return (
        <>
            {loading && <LinearProgress color="secondary"/>}
            <h1> LOGIN </h1>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
                                <TextField
                                    sx={{m: 2, width: '31ch'}}
                                    variant="standard"
                                    label="Email"
                                    margin="normal"
                                    // size={"small"}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email
                                    ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                                    : null}

                                <FormControl sx={{m: 2, width: '31ch'}} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        error={!!(formik.touched.password1 && formik.errors.password1)}
                                        {...formik.getFieldProps('password1')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                {formik.touched.password1 && formik.errors.password1
                                    ? <div style={{color: 'red'}}>{formik.errors.password1}</div>
                                    : null}
                                <FormControlLabel label={'Remember me'} control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                }/>
                                {error && <Alert severity="error">{error}</Alert>}
                                <Button style={{marginTop: '10px'}} type={'submit'} variant={'contained'}
                                        color={'primary'} disabled={disabled}>Login</Button>
                            </FormGroup>
                            <Button style={{marginTop: '10px'}} variant={'contained'}
                                    color={'warning'} onClick={onClickHandlerForForgotPassword}>Forgot password</Button>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </>
    )
};

