import React, { JSX, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { REACT_ROUTES } from "../../constants/routeConstants";
import { REGISTER_ERROR_TEXTS } from "../../types/register/regIsterErrors";
import {  isHTML } from "../../utils/Utils";
import { AxiosError } from "axios";
import { createTemplate } from "../../network";
import { useEmailSignatureContext } from "../../context/Context";
import { CreateTemplateErrorState, CreateTemplateKey, CreateTemplateState, CreateTemplateStateKeys, initalCreateTemplateStateError, intialCreateTemplateState } from "../../types/templateCreation/templateState";
import { CREATE_TEMPLATE_ERROR_TEXTS } from "../../types/templateCreation/templateErrors";

const TemplateCreation = (): JSX.Element => {
    const [state, setState] = useState<CreateTemplateState>(intialCreateTemplateState);
    const [errorState, setErrorState] = useState<CreateTemplateErrorState>(initalCreateTemplateStateError);
    const [errorTexts, setErrorTexts] = useState<CreateTemplateState>(intialCreateTemplateState);
    const [errorText, setErrorText] = useState<string>("");
    const { setIsLoading } = useEmailSignatureContext();

    const navigate: NavigateFunction = useNavigate();

    const setItemState = (key: CreateTemplateKey, value: string): void => {
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
        setItemState(name as CreateTemplateKey, value);
    }

    const changeError = (name: CreateTemplateKey, errorText: string, error: boolean): void => {
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
        const errors: Record<CreateTemplateKey, () => string> = {
            [CreateTemplateStateKeys.NAME]: () => {
                if (!value) return CREATE_TEMPLATE_ERROR_TEXTS.NAME_EMPTY
                return "";
            },
            [CreateTemplateStateKeys.HTML_CONTENT]: () => {
                if (!value) return CREATE_TEMPLATE_ERROR_TEXTS.HTML_CONTENT_EMPTY
                if (!isHTML(value)) return CREATE_TEMPLATE_ERROR_TEXTS.HTML_CONTENT_INVALID
                return "";
            },
            [CreateTemplateStateKeys.TEXT_CONTENT]: () => {
                if (!value) return CREATE_TEMPLATE_ERROR_TEXTS.TEXT_CONTENT_EMPTY
                if (!isHTML(value)) return CREATE_TEMPLATE_ERROR_TEXTS.TEXT_CONTENT_INVALID
                return "";
            },
            [CreateTemplateStateKeys.EXAMPLE_HTML_CONTENT]: () => {
                if (!value) return CREATE_TEMPLATE_ERROR_TEXTS.EXAMPLE_HTML_CONTENT_EMPTY
                if (!isHTML(value)) return CREATE_TEMPLATE_ERROR_TEXTS.EXAMPLE_HTML_CONTENT_INVALID
                return "";
            },
            [CreateTemplateStateKeys.EXAMPLE_TEXT_CONTENT]: () => {
                if (!value) return CREATE_TEMPLATE_ERROR_TEXTS.EXAMPLE_TEXT_CONTENT_EMPTY
                if (!isHTML(value)) return CREATE_TEMPLATE_ERROR_TEXTS.EXAMPLE_TEXT_CONTENT_INVALID
                return "";
            },
        }

        const errorText = errors[name as CreateTemplateKey]();
        changeError(name as CreateTemplateKey, errorText, !!errorText);
    }

    const isNetworkAccessPerform = (): boolean => {
        const hasValues: boolean[] = Object.entries(state).map(([key, value]) => {
            if (value) return true;
            changeError(key as CreateTemplateKey, REGISTER_ERROR_TEXTS.EMPTY_FIELD, true);
            return false;
        })

        return hasValues.every(hasValue => hasValue) && Object.values(errorState).every(error => !error);
    }

    const handleSubmit = async () => {
        if (!isNetworkAccessPerform()) return;
        try {
            setIsLoading(true);
            const result = await createTemplate(state);
            setIsLoading(false);
            setState(intialCreateTemplateState);
            setErrorState(initalCreateTemplateStateError);
            setErrorTexts(intialCreateTemplateState);
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
                Create Template
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        fullWidth
                        required
                        label={CreateTemplateStateKeys.NAME.toUpperCase()}
                        name={CreateTemplateStateKeys.NAME}
                        value={state.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.name}
                        helperText={errorTexts.name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label={CreateTemplateStateKeys.HTML_CONTENT.toUpperCase()}
                        name={CreateTemplateStateKeys.HTML_CONTENT}
                        value={state.htmlContent}
                        type="email"
                        multiline
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.htmlContent}
                        helperText={errorTexts.htmlContent}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label={CreateTemplateStateKeys.TEXT_CONTENT.toUpperCase()}
                        name={CreateTemplateStateKeys.TEXT_CONTENT}
                        value={state.textContent}
                        type="email"
                        multiline
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.textContent}
                        helperText={errorTexts.textContent}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label={CreateTemplateStateKeys.EXAMPLE_HTML_CONTENT.toUpperCase()}
                        name={CreateTemplateStateKeys.EXAMPLE_HTML_CONTENT}
                        value={state.exampleHtmlContent}
                        type="email"
                        multiline
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.exampleHtmlContent}
                        helperText={errorTexts.exampleHtmlContent}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        required
                        label={CreateTemplateStateKeys.EXAMPLE_TEXT_CONTENT.toUpperCase()}
                        name={CreateTemplateStateKeys.EXAMPLE_TEXT_CONTENT}
                        value={state.exampleTextContent}
                        type="email"
                        multiline
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errorState.exampleTextContent}
                        helperText={errorTexts.exampleTextContent}
                    />
                </Grid>
                <Grid alignContent={"center"} item xs={12}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Submit
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

export default TemplateCreation;