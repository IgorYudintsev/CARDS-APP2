import React, {useState} from 'react';
import {Alert, Button, FormControl, FormGroup, Grid, LinearProgress, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {ForgotpasswordThunkCreator} from "../../reducers/LoginReducer";
import {CheckEmail} from "./CheckEmail";

type FormikErrorType = {
    email?: string
    from?: string
    message?: string
}


export const ForgotPassword = () => {
    let [error, setError] = useState(null)
    let [loading, setLoading] = useState(false)
    let [checkEmail, setCheckEmail] = useState(false)
    let [disabled, setDisabled] = useState(false)
    let dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            from: '',
            message: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            setError(null)//у нас в случае 400 вылетает error. а блягодаря этой строке, как только начали что-то поновой вписывать в поле-всплыващка исчезает
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values) => {
            setLoading(true)
            setDisabled(true)
            let payload = {email: values.email, from: values.from, message: values.message}
            console.log(payload)
            dispatch(ForgotpasswordThunkCreator(payload, setCheckEmail, setLoading,setDisabled))
        },
    })

    if (checkEmail) {
        return <CheckEmail/>
    }

    return (
        <>
            {loading && <LinearProgress color="secondary"/>}
            <h1> RECOVERING PASSWORD </h1>
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

                                <TextField
                                    sx={{m: 2, width: '31ch'}}
                                    variant="standard"
                                    label="from"
                                    margin="normal"
                                    // size={"small"}
                                    {...formik.getFieldProps('from')}
                                />

                                <TextField
                                    sx={{m: 2, width: '31ch'}}
                                    variant="standard"
                                    label="message"
                                    margin="normal"
                                    multiline
                                    // size={"small"}
                                    {...formik.getFieldProps('message')}
                                />

                                {error && <Alert severity="error">{error}</Alert>}
                                <Button style={{marginTop: '10px'}} type={'submit'} variant={'contained'}
                                        color={'primary'} disabled={disabled}>Send for recover password</Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

