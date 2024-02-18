import { createContext, useContext } from 'react';

export interface EmailSignatureContextType {
  
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const EmailSignatureContext = createContext<EmailSignatureContextType | undefined>(undefined);

export const useEmailSignatureContext = () => {
  const context = useContext(EmailSignatureContext);
  if (!context) {
    throw new Error('useEmailSignatureContext must be used within EmailSignatureContextContextProvider');
  }
  return context;
};

export default EmailSignatureContext;