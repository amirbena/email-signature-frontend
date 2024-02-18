import axios, { AxiosInstance } from 'axios';
import { Routes, TemplateRoutes, UsersRoutes } from './dto/routes/routes';
import { UserRegisterDto } from './dto/request/users/reegisterDto';
import { AuthenticatedUser } from './dto/response/users/AuthenticatedUser';
import { UserLoginDto } from './dto/request/users/loginDto';
import { TemplateCreation } from './dto/request/templates/templateCreationDto';
import { TemplateDocument } from './dto/models/Template';
import { Types } from 'mongoose';
import { AuthorizationCookie, BACKEND_URI } from './constants';
import { getCookieByName } from '../utils/Utils';
import { EmailSignatureCreation } from './dto/request/email-signatures/emailSignatureCreation';
import { EmailSignatureResult } from './dto/response/email-signatures/EmailSignatureResult';
import Cookies from 'js-cookie';

export const networkProxy: AxiosInstance = axios.create({ baseURL: `${process.env.REACT_APP_BACKEND_URL || BACKEND_URI}/`, withCredentials: true });


const baseUrl= process.env.REACT_APP_BACKEND_URL || BACKEND_URI;
/** USER AREA */


export const registerUser = async (userDto: UserRegisterDto): Promise<AuthenticatedUser> => {
    const result = await networkProxy.post(`${baseUrl}/${Routes.Users}`, userDto);
    Cookies.set(AuthorizationCookie, result.data.accessToken)
    return result.data;
}

export const loginUser = async (userLogin: UserLoginDto): Promise<AuthenticatedUser> => {
    const result = await networkProxy.post(`${Routes.Users}${UsersRoutes.LOGIN}`, userLogin);
    Cookies.set(AuthorizationCookie, result.data.accessToken)
    return result.data;
}

/** Template Area */


export const createTemplate = async (templateCreation: TemplateCreation): Promise<TemplateDocument> => {
    const result = await networkProxy.post(`${Routes.Templates}`, templateCreation);
    return result.data;
}

export const getTemplate = async (templateId: Types.ObjectId): Promise<TemplateDocument> => {
    const result = await networkProxy.get(`${Routes.Templates}${templateId}`, { headers: { Authorization: `Bearer ${getCookieByName(AuthorizationCookie)}` } });
    return result.data;
}


export const getAllTemplatesByUser = async (): Promise<TemplateDocument[]> => {
    const result = await networkProxy.get(`${Routes.Templates}${TemplateRoutes.ALL}`, { headers: { Authorization: `Bearer ${getCookieByName(AuthorizationCookie)}` } });
    return result.data;
}

/**EMAIL SIGNATURE */
export const createEmailSignature = async (emailSignature: EmailSignatureCreation): Promise<EmailSignatureResult> => {
    const emailSignatureResult = await networkProxy.post(`${Routes.EmailSignatures}`, emailSignature, { headers: { Authorization: `Bearer ${getCookieByName(AuthorizationCookie)}` } });
    return emailSignatureResult.data;
}


export const getEmailSignaturesByUser = async (): Promise<EmailSignatureResult[]> => {
    const emailSignatureResult = await networkProxy.get(`${Routes.EmailSignatures}`, { headers: { Authorization: `Bearer ${getCookieByName(AuthorizationCookie)}` } })
    return emailSignatureResult.data;
}