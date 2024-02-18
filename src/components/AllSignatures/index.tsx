import { useEmailSignatureContext } from "../../context/Context";
import { EmailSignatureResult } from "../../network/dto/response/email-signatures/EmailSignatureResult";
import React, { JSX, useEffect, useState } from "react";
import { getEmailSignaturesByUser } from "../../network";
import { Button, Grid } from "@mui/material";
import SingleSignature from "./SingleSignature/singleSignature";
import { useNavigate } from "react-router-dom";
import { REACT_ROUTES } from "../../constants/routeConstants";

const AllSignatures = (): JSX.Element => {

    const [allEmailSignatures, setAllEmailSignatures] = useState<EmailSignatureResult[]>([]);
    const { setIsLoading } = useEmailSignatureContext();
    const navigate = useNavigate();

    const navigateToCreateSignature = () => navigate(REACT_ROUTES.CREATE_SIGNATURE, { replace: true });

    useEffect(() => {
        const handleEmailSignatures = async () => {
            setIsLoading(true);
            try {
                const emailSignatures = await getEmailSignaturesByUser();
                setIsLoading(false);
                setAllEmailSignatures(emailSignatures);
            } catch (error) {
                setAllEmailSignatures([]);
                setIsLoading(false);
            }

        }

        handleEmailSignatures();

    }, [])

    const renderEmailSignatures = (): JSX.Element => {
        return (
            <>
                {allEmailSignatures.map(emailSignature => (
                    <Grid item xs={3}>
                        <SingleSignature emailSignature={emailSignature} />
                    </Grid>
                ))}
            </>
        )
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {
                    renderEmailSignatures()
                }
                <Grid item xs={12} style={{ marginTop: '10px' }}>
                    <Button color="info" onClick={navigateToCreateSignature}>
                        Create Email Signature
                    </Button>
                </Grid>

            </Grid>
        </Grid>
    );
}

export default AllSignatures;