import React from 'react';
import { WarningCard, Button } from './styles';

export default (props) => {
    return(
        <WarningCard>
            <h3>Warning</h3>
            <p className='text'>Are you sure you wish to cancel? All changes will be lost.</p>
            <div className='btn-container'>
                <Button color='sun' onClick={props.handleReDirect}>
                    <p>I'm Sure</p>
                </Button>
                <Button color='scienceBlue' marginLeft='10px' onClick={props.handleCancel}>
                    <p>Back to Form</p>
                </Button>
            </div>
        </WarningCard>
    )
}