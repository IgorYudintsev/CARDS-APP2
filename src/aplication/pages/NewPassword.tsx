import React, {useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {
    Alert,
    Button,
    FormControl,
    FormGroup,
    Grid, IconButton,
    Input, InputAdornment,
    InputLabel,
    LinearProgress,
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {newPasswordThunkCreator} from "../../reducers/LoginReducer";
import {Visibility, VisibilityOff} from "@material-ui/icons";


type FormikErrorType = {
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

export const NewPassword = () => {
    //--------------------------------------------------ловим токен-------------------------------------------------------
    const location = useLocation()
    let token = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)

    let [error, setError] = useState(null)
    let [loading, setLoading] = useState(false)
    let [redirect, setRedirect] = useState(false)
    let [disabled, setDisabled] = useState(false)

    let dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            password1: '',
            password2: '',
        },

        validate: (values) => {
            const errors: FormikErrorType = {};
            setError(null)//у нас в случае 400 вылетает error. а блягодаря этой строке, как только начали что-то поновой вписывать в поле-всплыващка исчезает
            if (!values.password1) {
                errors.password1 = 'Поле пароль обязательно';
            } else if (values.password1.length < 2) {
                errors.password1 = 'Must be 3 characters or less';
            }

            if (values.password1 !== values.password2) {
                errors.password2 = 'Пароль должен совпадать';
            } else if (values.password1.length < 2) {
                errors.password2 = 'Must be 3 characters or less';
            }
            return errors;
        },
        onSubmit: (values) => {
            setLoading(true)
            setDisabled(true)
            let payload = {password: values.password1, resetPasswordToken: token}
            dispatch(newPasswordThunkCreator(payload, setLoading, setRedirect, setDisabled, setError))
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
    if (redirect) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            {loading && <LinearProgress color="secondary"/>}
            <h1> NEW PASSWORD </h1>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormGroup>
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

                                <FormControl sx={{m: 2, width: '31ch'}} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">repeat password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={values.showPassword ? 'text' : 'repeat password'}
                                        error={!!(formik.touched.password2 && formik.errors.password2)}
                                        {...formik.getFieldProps('password2')}
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
                                {formik.touched.password2 && formik.errors.password2
                                    ? <div style={{color: 'red'}}>{formik.errors.password2}</div>
                                    : null}

                                {error && <Alert severity="error">{error}</Alert>}
                                <Button style={{marginTop: '10px'}} type={'submit'} variant={'contained'}
                                        color={'primary'} disabled={disabled}>Send new password</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

