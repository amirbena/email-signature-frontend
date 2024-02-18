import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { SingleSignatureProps } from "types/allsignatures/singleSignature";

const SingleSignature: FC<SingleSignatureProps> = ({ emailSignature }) => {

    const { name, signature } = emailSignature;

    return (

        <Paper>
            <Typography variant='h1' color="Highlight">{name}</Typography>
            <div
                style={{ marginTop: '10px' }}
                dangerouslySetInnerHTML={{
                    __html: signature,
                }}
            />
        </Paper>
    );
}

export default SingleSignature;