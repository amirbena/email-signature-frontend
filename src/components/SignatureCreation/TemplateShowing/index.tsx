import React, { FC } from 'react';
import { TemplateShowingProps } from '../../../types/signatureCreation/templateShowing';
import { Paper, Radio, Typography } from '@mui/material';
import { SelectedSignature } from '../../../network/dto/request/email-signatures/selectedSignature';


const TemplateShowing: FC<TemplateShowingProps> = ({ template, selectTemplate, selectedTemplateId, error }) => {
    const { exampleTextContent, exampleHtmlContent, _id, name } = template;

    return (
        <>
            <Radio checked={selectedTemplateId === _id} color='info' onChange={() => selectTemplate(_id)}></Radio>
            <Paper color={error ? "red" : "white"}>
                <Typography variant='h1' color="Highlight">{name}</Typography>
                <Typography variant='h2' color="InfoText">{SelectedSignature.HTML}</Typography>
                <div
                    style={{ marginTop: '10px' }}
                    dangerouslySetInnerHTML={{
                        __html: exampleHtmlContent,
                    }}
                />
                <Typography variant='h2' color="InfoText" style={{ marginTop: '30px' }}>{SelectedSignature.TEXT}</Typography>
                <div
                    style={{ marginTop: '10px' }}
                    dangerouslySetInnerHTML={{
                        __html: exampleTextContent,
                    }}
                />
            </Paper>
        </>
    );
}

export default TemplateShowing;