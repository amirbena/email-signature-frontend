import React, { JSX, useState } from "react";
import { RegisterState, RegisterStateError, RegisterStateKey, RegisterStateKeys, intialRegisterState, intialRegisterStateError } from "../../types/register/registerState";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { REACT_ROUTES } from "../../constants/routeConstants";
import { REGISTER_ERROR_TEXTS } from "../../types/register/regIsterErrors";
import { isEmail, isImageUrl, isPhoneNumber } from "../../utils/Utils";
import { AxiosError } from "axios";
import { registerUser } from "../../network";
import { useEmailSignatureContext } from "../../context/Context";

const Register = (): JSX.Element => {
    const [state, setState] = useState<RegisterState>(intialRegisterState);
    const [errorState, setErrorState] = useState<RegisterStateError>(intialRegisterStateError);
    const [errorTexts, setErrorTexts] = useState<RegisterState>(intialRegisterState);
    const [errorText, setErrorText] = useState<string>("");
    const { setIsLoading } = useEmailSignatureContext();

    const navigate: NavigateFunction = useNavigate();

    const setItemState = (key: RegisterStateKey, value: string): void => {
        setState(state => ({
            ...state,
            [key]: value
        }))
    }

    const handleLogin = () => {
        navigate(REACT_ROUTES.LOGIN, { replace: true });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItemState(name as RegisterStateKey, value);
    }

    const changeError = (name: RegisterStateKey, errorText: string, error: boolean): void => {
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
        const errors: Record<RegisterStateKey, () => string> = {
            [RegisterStateKeys.NAME]: () => {
                if (!value) return REGISTER_ERROR_TEXTS.NAME_EMPTY
                return "";
            },
            [RegisterStateKeys.EMAIL]: () => {
                if (!value) return REGISTER_ERROR_TEXTS.EMAIL_EMPTY
                if (!isEmail(value)) return REGISTER_ERROR_TEXTS.EMAIL_INVALID
                return "";
            },
            [RegisterStateKeys.PASSWORD]: () => {
                if (!value) return REGISTER_ERROR_TEXTS.PASSWORD_EMPTY

                return "";
            },
            [RegisterStateKeys.PHOTO_URL]: () => {
                if (value && !isImageUrl(value)) return REGISTER_ERROR_TEXTS.INVALID_PHOTO_URL
                return "";
            },
            [RegisterStateKeys.PHONE]: () => {
                if (!value) return REGISTER_ERROR_TEXTS.PHONE_EMPTY
                if (!isPhoneNumber(value)) return REGISTER_ERROR_TEXTS.INVALID_PHONE
                return ""
            }
        }

        const errorText = errors[name as RegisterStateKey]();
        changeError(name as RegisterStateKey, errorText, !!errorText);
    }

    const isNetworkAccessPerform = (): boolean => {
        const hasValues: boolean[] = Object.entries(state).map(([key, value]) => {
            if (value || (!value && key === RegisterStateKeys.PHOTO_URL)) return true;
            changeError(key as RegisterStateKey, REGISTER_ERROR_TEXTS.EMPTY_FIELD, true);
            return false;
        })

        return hasValues.every(hasValue => hasValue) && Object.values(errorState).every(error => !error);
    }

    const handleSubmit = async () => {
        if (!isNetworkAccessPerform()) return;
        try {
            setIsLoading(true);
            const result = await registerUser({ ...state, photoUrl: !!state.photoUrl ? state.photoUrl : undefined });
            setIsLoading(false);
            const { responseMessage } = result;
            setErrorText(responseMessage);
            setState(intialRegisterState);
            setErrorState(intialRegisterStateError);
            setErrorTexts(intialRegisterState);
            navigate(REACT_ROUTES.ALL_SIGNATURES, { replace: true });


        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorText(error.response?.data.message);
            }
        }
    }


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        required
                        label={RegisterStateKeys.NAME.toUpperCase()}
                        name={RegisterStateKeys.NAME}
                        value={state.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.name}
                        helperText={errorTexts.name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        required
                        label={RegisterStateKeys.EMAIL.toUpperCase()}
                        name={RegisterStateKeys.EMAIL}
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
                        label={RegisterStateKeys.PASSWORD.toUpperCase()}
                        required
                        name={RegisterStateKeys.PASSWORD}
                        value={state.password}
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.password}
                        helperText={errorTexts.password}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={RegisterStateKeys.PHONE.toUpperCase()}
                        required
                        name={RegisterStateKeys.PHONE}
                        value={state.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.phone}
                        helperText={errorTexts.phone}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label={RegisterStateKeys.PHOTO_URL.toUpperCase()}
                        name={RegisterStateKeys.PHOTO_URL}
                        value={state.photoUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.photoUrl}
                        helperText={errorTexts.photoUrl}
                    />
                </Grid>
                <Grid alignContent={"center"} item xs={8}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
                    </Button>

                </Grid>
                <Grid item xs={4}>
                    <Button onClick={handleLogin} variant="contained" color="secondary">
                        TO LOGIN PAGE
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

export default Register;