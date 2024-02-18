import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate, } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TemplateCreation from './components/TemplateCreation';
import AllSignatures from './components/AllSignatures';
import SignaturesCreation from './components/SignatureCreation';
import { REACT_ROUTES } from './constants/routeConstants';
import Cookies from 'js-cookie';
import { AuthorizationCookie } from './network/constants';
import { useEmailSignatureContext } from './context/Context';
import { CircularProgress } from '@mui/material';


const App = (): React.JSX.Element => {

  const { isLoading } = useEmailSignatureContext();
  const Home = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
      navigate(Cookies.get(AuthorizationCookie) ? REACT_ROUTES.ALL_SIGNATURES : REACT_ROUTES.REGISTER);
    }, [navigate]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={REACT_ROUTES.REGISTER} element={<Register />} />
          <Route path={REACT_ROUTES.LOGIN} element={<Login />} />
          <Route path={REACT_ROUTES.TEMPLATE_CREATION} element={<TemplateCreation />} />
          <Route path={REACT_ROUTES.ALL_SIGNATURES} element={<AllSignatures />} />
          <Route path={REACT_ROUTES.CREATE_SIGNATURE} element={<SignaturesCreation />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      {isLoading &&
        <div style={{ position: 'relative', left: '50%', bottom: '50%' }}>
          <CircularProgress />
        </div>
      }
    </>
  );
};

export default App;
