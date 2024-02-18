export interface LoginState {
    email: string;
    password: string;
}

export const intialLoginState: LoginState = {
    email: "",
    password: "",
}

export interface LoginStateError {
    email: boolean;
    password: boolean;
}

export const intialLoginStateError: LoginStateError = {
    email: false,
    password: false,
}

export type LoginStateKey = keyof LoginState;

export enum LoginStateKeys {
    EMAIL = "email",
    PASSWORD = "password",

}