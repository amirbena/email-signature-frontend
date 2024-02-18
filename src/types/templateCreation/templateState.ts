export interface CreateTemplateState {
    name: string;
    htmlContent: string;
    textContent: string;
    exampleHtmlContent: string;
    exampleTextContent: string;
}

export const intialCreateTemplateState: CreateTemplateState = {
    name: "",
    htmlContent: "",
    textContent: "",
    exampleHtmlContent: "",
    exampleTextContent: ""
}

export interface CreateTemplateErrorState {
    name: boolean;
    htmlContent: boolean;
    textContent: boolean;
    exampleHtmlContent: boolean;
    exampleTextContent: boolean;
}


export const initalCreateTemplateStateError: CreateTemplateErrorState = {
    name: false,
    htmlContent: false,
    textContent: false,
    exampleHtmlContent: false,
    exampleTextContent: false
}

export type CreateTemplateKey = keyof CreateTemplateState;

export enum CreateTemplateStateKeys {
    NAME = "name",
    HTML_CONTENT = "htmlContent",
    TEXT_CONTENT = "textContent",
    EXAMPLE_HTML_CONTENT = "exampleHtmlContent",
    EXAMPLE_TEXT_CONTENT = "exampleTextContent",
}