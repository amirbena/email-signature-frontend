import { Types } from "mongoose";
import { createEmailSignature, getAllTemplatesByUser } from "../../network";
import { TemplateDocument } from "../../network/dto/models/Template";
import React, { JSX, useEffect, useState, FC, ReactNode } from "react";
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import TemplateShowing from "./TemplateShowing";
import { useEmailSignatureContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { REACT_ROUTES } from "../../constants/routeConstants";
import { intialCreateEmailSignatureState, CreateEmailSignatureState, CreateEmailSignatureKey, initalCreateEmailSignatureStateError, CreateEmailSignatureErrorState, CreateEmailSignatureErrorTextsState, initialEmailSignatureErrorTextState, CreateEmailSignatureStateKeys } from "../../types/signature-creation/signatureState";
import { AxiosError } from "axios";
import { isEmail, isImageUrl, isPhoneNumber } from "../../utils/Utils";
import { CREATE_EMAIL_SIGNATURE_ERROR_TEXTS } from "../../types/signature-creation/signatureErrors";
import { SelectedSignature } from "../../network/dto/request/email-signatures/selectedSignature";

const SignaturesCreation: FC = () => {
    const [templates, setTemplates] = useState<TemplateDocument[]>([]);
    const [emailSignatureState, setEmailSignatureState] = useState<CreateEmailSignatureState>(intialCreateEmailSignatureState);
    const [errorState, setErrorState] = useState<CreateEmailSignatureErrorState>(initalCreateEmailSignatureStateError);
    const [errorTexts, setErrorTexts] = useState<CreateEmailSignatureErrorTextsState>(initialEmailSignatureErrorTextState);
    const { setIsLoading } = useEmailSignatureContext();
    const [errorText, setErrorText] = useState("");
    const [createdSignature, setCreatedSignature] = useState("");
    const navigate = useNavigate();



    useEffect(() => {
        const fetchTemplates = async (): Promise<void> => {
            try {
                setIsLoading(true);
                const fetchedTemplates = await getAllTemplatesByUser();
                setIsLoading(false);
                setTemplates(fetchedTemplates);
            } catch (error) {
                setTemplates([]);
                setIsLoading(false);
            }
        }
        fetchTemplates();
    }, [])

    const selectTemplate = (templateId: Types.ObjectId) => {
        setEmailSignatureState(state => ({
            ...state,
            selectedTemplate: templateId
        }));
    }

    const handleSelect = (event: SelectChangeEvent<SelectedSignature>, child: ReactNode): void => {
        const { target: { value } } = event;
        setEmailSignatureState(state => ({
            ...state,
            selectedSignature: value as SelectedSignature
        }))
    }

    const navigateToCreateTemplate = () => {
        navigate(REACT_ROUTES.TEMPLATE_CREATION, { replace: true });
    }

    const renderTemplates = (): JSX.Element => {
        return (
            <>
                {templates.map(template => (
                    <Grid item xs={3}>
                        <TemplateShowing selectTemplate={selectTemplate} template={template} selectedTemplateId={emailSignatureState.selectedTemplate} error={errorState.selectedTemplate} />
                    </Grid>
                ))}
            </>
        )
    }

    const setItemState = (name: CreateEmailSignatureKey, value: string) => {
        setEmailSignatureState(state => ({
            ...state,
            [name]: value
        }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setItemState(name as CreateEmailSignatureKey, value);
    }

    const changeError = (name: CreateEmailSignatureKey, errorText: string, error: boolean): void => {
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
        const errors: Record<CreateEmailSignatureKey, () => string> = {
            [CreateEmailSignatureStateKeys.NAME]: () => "",
            [CreateEmailSignatureStateKeys.SELECTED_TEMPLATE]: () => "",
            [CreateEmailSignatureStateKeys.SELECTED_SIGNATURE]: () => "",
            [CreateEmailSignatureStateKeys.EMAIL]: () => {
                if (!isEmail(value)) return CREATE_EMAIL_SIGNATURE_ERROR_TEXTS.EMAIL_INVALID
                return "";
            },
            [CreateEmailSignatureStateKeys.PHOTO_URL]: () => {
                if (value && !isImageUrl(value)) return CREATE_EMAIL_SIGNATURE_ERROR_TEXTS.INVALID_PHOTO_URL
                return "";
            },
            [CreateEmailSignatureStateKeys.PHONE]: () => {
                if (!isPhoneNumber(value)) return CREATE_EMAIL_SIGNATURE_ERROR_TEXTS.INVALID_PHONE
                return ""
            }
        }

        const errorText = errors[name as CreateEmailSignatureKey]();
        changeError(name as CreateEmailSignatureKey, errorText, !!errorText);
    }

    const isNetworkAccessPerform = (): boolean => {
        const hasValues: boolean[] = Object.entries(emailSignatureState).map(([key, value]) => {
            if (!value && key !== CreateEmailSignatureStateKeys.SELECTED_SIGNATURE && key !== CreateEmailSignatureStateKeys.SELECTED_TEMPLATE) return true;
            return false;
        })

        return hasValues.every(hasValue => hasValue) && Object.values(errorState).every(error => !error);
    }

    const handleSubmit = async () => {
        if (!isNetworkAccessPerform()) return;
        try {
            setIsLoading(true);
            const result = await createEmailSignature({ ...emailSignatureState, selectedTemplate: emailSignatureState.selectedTemplate as TemplateDocument });
            setIsLoading(false);
            setCreatedSignature(result.signature);
            setEmailSignatureState(intialCreateEmailSignatureState);
            setErrorState(initalCreateEmailSignatureStateError);
            setErrorTexts(initialEmailSignatureErrorTextState);
            navigate(REACT_ROUTES.ALL_SIGNATURES, { replace: true });


        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorText(error.response?.data.message);
            }
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {
                        renderTemplates()
                    }
                    <Grid item xs={12} style={{ marginTop: '10px' }}>
                        <Button color="info" onClick={navigateToCreateTemplate}>
                            Create Template
                        </Button>
                    </Grid>

                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                required
                                label={CreateEmailSignatureStateKeys.NAME.toUpperCase()}
                                name={CreateEmailSignatureStateKeys.NAME}
                                value={emailSignatureState.name}
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
                                label={CreateEmailSignatureStateKeys.EMAIL.toUpperCase()}
                                name={CreateEmailSignatureStateKeys.EMAIL}
                                value={emailSignatureState.email}
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
                                label={CreateEmailSignatureStateKeys.PHONE.toUpperCase()}
                                required
                                name={CreateEmailSignatureStateKeys.PHONE}
                                value={emailSignatureState.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errorState.phone}
                                helperText={errorTexts.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label={CreateEmailSignatureStateKeys.PHOTO_URL.toUpperCase()}
                                name={CreateEmailSignatureStateKeys.PHOTO_URL}
                                value={emailSignatureState.photoUrl}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errorState.photoUrl}
                                helperText={errorTexts.photoUrl}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="select-label">Select Item</InputLabel>
                            <Select
                                labelId="select-label"
                                value={emailSignatureState.selectedSignature}
                                onChange={handleSelect}
                            >
                                <MenuItem value={SelectedSignature.HTML}>{SelectedSignature.HTML}</MenuItem>
                                <MenuItem value={SelectedSignature.TEXT}>{SelectedSignature.TEXT}</MenuItem>
                            </Select>

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
                            </Grid>
                        }
                        {
                            !!createdSignature &&
                            <div
                                style={{ marginTop: '10px' }}
                                dangerouslySetInnerHTML={{
                                    __html: createdSignature,
                                }}
                            />
                        }

                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default SignaturesCreation;