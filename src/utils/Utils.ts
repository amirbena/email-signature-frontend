
import Cookies from 'js-cookie';

export const getCookieByName = (name: string): string => {
    return Cookies.get()[name];
}

export const isEmail = (value: string): boolean => {
    // Regular expression for email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(value);
};


export const isPhoneNumber = (value: string): boolean => {
    const usPhoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    const israeliPhoneRegex = /^(972-?|0)([23489]|5[0248]|77)[0-9]{7}$/;
    return usPhoneRegex.test(value) || israeliPhoneRegex.test(value);
};

export const isImageUrl = (value: string): boolean => {
    const imageRegex = /\.(jpeg|jpg|gif|png)$/i;
    return imageRegex.test(value);
};

export const isHTML = (str: string): boolean => {
    const pattern = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
    return pattern.test(str);
};