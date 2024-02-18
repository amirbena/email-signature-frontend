import React, { useState } from 'react';
import EmailSignatureContext, { EmailSignatureContextType } from './Context';

interface Props {
    children: React.ReactNode;
}

const EmailSignatureContextProvider: React.FC<Props> = ({ children }) => {
    const [isLoading, setIsLoading] = useState < boolean > (false);

    const contextValue: EmailSignatureContextType = {
        isLoading,
        setIsLoading
    };

    return <EmailSignatureContext.Provider value={contextValue}>{children}</EmailSignatureContext.Provider>;
};

export default EmailSignatureContextProvider;