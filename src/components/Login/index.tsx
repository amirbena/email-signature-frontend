import React, { JSX, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { REACT_ROUTES } from "../../constants/routeConstants";
import { REGISTER_ERROR_TEXTS } from "../../types/register/regIsterErrors";
import { isEmail } from "../../utils/Utils";
import { AxiosError } from "axios";
import { loginUser } from "../../network";
import { LoginState, LoginStateError, LoginStateKey, LoginStateKeys, intialLoginState, intialLoginStateError } from "../../types/login/loginState";
import { useEmailSignatureContext } from "../../context/Context";

const Login = (): JSX.Element => {
    const [state, setState] = useState<LoginState>(intialLoginState);
    const [errorState, setErrorState] = useState<LoginStateError>(intialLoginStateError);
    const [errorTexts, setErrorTexts] = useState<LoginState>(intialLoginState);
    const [errorText, setErrorText] = useState<string>("");
    const { setIsLoading } = useEmailSignatureContext();

    const navigate: NavigateFunction = useNavigate();

    const setItemState = (key: LoginStateKey, value: string): void => {
        setState(state => ({
            ...state,
            [key]: value
        }))
    }

    const handleRegister = () => {
        navigate(REACT_ROUTES.REGISTER, { replace: true });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItemState(name as LoginStateKey, value);
    }

    const changeError = (name: LoginStateKey, errorText: string, error: boolean): void => {
        setErrorState(state => ({
            ...state,
            [name]: error
        }))

        setErrorTexts(state => ({
            ...state,
            [name]: errorText
        }))
    }

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const errors: Record<LoginStateKey, () => string> = {

            [LoginStateKeys.EMAIL]: () => {
                if (!value) return REGISTER_ERROR_TEXTS.EMAIL_EMPTY
                if (!isEmail(value)) return REGISTER_ERROR_TEXTS.EMAIL_INVALID
                return "";
            },
            [LoginStateKeys.PASSWORD]: () => {
                if (!value) return REGISTER_ERROR_TEXTS.PASSWORD_EMPTY
                return "";
            },

        }

        const errorText = errors[name as LoginStateKey]();
        changeError(name as LoginStateKey, errorText, !!errorText);
    }

    const isNetworkAccessPerform = (): boolean => {
        const hasValues: boolean[] = Object.entries(state).map(([key, value]) => {
            if (value) return true;
            changeError(key as LoginStateKey, REGISTER_ERROR_TEXTS.EMPTY_FIELD, true);
            return false;
        })

        return hasValues.every(hasValue => hasValue) && Object.values(errorState).every(error => !error);
    }

    const handleSubmit = async () => {
        if (!isNetworkAccessPerform()) return;
        try {
            setIsLoading(true);
            const result = await loginUser(state);
            setIsLoading(false);
            const { responseMessage } = result;
            setErrorText(responseMessage);
            setState(intialLoginState);
            setErrorState(intialLoginStateError);
            setErrorTexts(intialLoginState);
            navigate(REACT_ROUTES.ALL_SIGNATURES, { replace: true });


        } catch (error) {
            if (error instanceof AxiosError) {
                setIsLoading(false);
                setErrorText(error.response?.data.message);
            }
        }
    }


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                LOGIN
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label={LoginStateKeys.EMAIL.toUpperCase()}
                        name={LoginStateKeys.EMAIL}
                        value={state.email}
                        type="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.email}
                        helperText={errorTexts.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={LoginStateKeys.PASSWORD.toUpperCase()}
                        required
                        name={LoginStateKeys.PASSWORD}
                        value={state.password}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.password}
                        helperText={errorTexts.password}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>

                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleRegister} variant="contained" color="secondary">
                        TO Register Page
                    </Button>
                </Grid>
                {
                    !!errorText &&
                    <Grid item xs={12}>
                        <Typography variant="body1" color="red">{errorText}</Typography>
                    </Grid>}

            </Grid>
        </Container >
    );
}

export default Login;