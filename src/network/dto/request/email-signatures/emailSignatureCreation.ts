import { Types } from "mongoose";
import { SelectedSignature } from "./selectedSignature";

export interface EmailSignatureCreation {

    selectedTemplate: Types.ObjectId;
    name?: string;
    email?: string;
    phone?: string;
    selectedSignature: SelectedSignature;
    photoUrl?: string;
    htmlContent?: string;
    textContent?: string;

}