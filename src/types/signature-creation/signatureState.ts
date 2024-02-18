import { Types } from "mongoose";
import { SelectedSignature } from "../../network/dto/request/email-signatures/selectedSignature";

export interface CreateEmailSignatureState {
    selectedTemplate?: Types.ObjectId
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
    selectedSignature: SelectedSignature;
}

export const intialCreateEmailSignatureState: CreateEmailSignatureState = {
    selectedTemplate: undefined,
    name: "",
    email: "",
    phone: "",
    photoUrl: "",
    selectedSignature: SelectedSignature.HTML
}

export interface CreateEmailSignatureErrorState {
    selectedTemplate: boolean;
    name: boolean;
    email: boolean;
    phone: boolean;
    photoUrl: boolean;
}

export interface CreateEmailSignatureErrorTextsState {
    name: string;
    email: string;
    phone: string;
    photoUrl: string;
}

export const initialEmailSignatureErrorTextState: CreateEmailSignatureErrorTextsState = {
    name: "",
    email: "",
    phone: "",
    photoUrl: "",
}

export const initalCreateEmailSignatureStateError: CreateEmailSignatureErrorState = {
    selectedTemplate: false,
    name: false,
    email: false,
    phone: false,
    photoUrl: false
}

export type CreateEmailSignatureKey = keyof CreateEmailSignatureState;

export enum CreateEmailSignatureStateKeys {
    NAME = "name",
    EMAIL = "email",
    PHONE = "phone",
    PHOTO_URL = "photoUrl",
    SELECTED_TEMPLATE = "selectedTemplate",
    SELECTED_SIGNATURE = "selectedSignature"
}