import { Types } from "mongoose";
import { User } from "./User";

export type TemplateDocument = Template & Types.ObjectId;

export interface Template {
    name: string;
    htmlContent: string;
    textContent: string;
    user: User;
    exampleHtmlContent: string;
    exampleTextContent: string;

}