import { Types } from "mongoose";

export type UserDocument = User & Types.ObjectId;

export interface User {

    name: string;
    email: string;
    phone: string;
    photoUrl?: string;


}