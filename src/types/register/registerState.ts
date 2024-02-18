export interface RegisterState {
    name: string;
    email: string;
    password: string;
    phone: string;
    photoUrl: string;
}

export const intialRegisterState: RegisterState = {
    name: "",
    email: "",
    password: "",
    phone: "",
    photoUrl: ""
}

export interface RegisterStateError {
    name: boolean;
    email: boolean;
    password: boolean;
    phone: boolean;
    photoUrl: boolean;
}

export const intialRegisterStateError: RegisterStateError = {
    name: false,
    email: false,
    password: false,
    phone: false,
    photoUrl: false
}

export type RegisterStateKey = keyof RegisterState;

export enum RegisterStateKeys {
    NAME = "name",
    EMAIL = "email",
    PASSWORD = "password",
    PHONE = "phone",
    PHOTO_URL = "photoUrl"
}