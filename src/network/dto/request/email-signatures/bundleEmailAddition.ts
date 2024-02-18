import { Types } from "mongoose";
import { SelectedSignature } from "./selectedSignature";

export interface BundleEmailSignaturesCreation {

    userEmail: string;
    emailSignaturesToAdd: EmailSignatureAddition[]

}

export interface EmailSignatureAddition {
    selectedTemplate: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    selectedSignature: SelectedSignature;
    photoUrl?: string;
    htmlContent?: string;
    textContent?: string;

}

