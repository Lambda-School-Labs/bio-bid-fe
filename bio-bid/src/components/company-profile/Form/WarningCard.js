import React from 'react';
import { Card, Button } from './styles';

export default props => {
    if(props.warning === 'import'){
        return (
            <Card>
                <h1>Warning</h1>
                <p className='message'>Importing company data from LinkedIn will overwrite current data.</p>
                <div className='btn-container'>
                    <Button onClick={props.action}>
                        <p>Import</p>
                    </Button>
                    <Button cancel='true' onClick={props.close}>
                        <p>Cancel</p>
                    </Button>
                </div>
            </Card>
        );
    }
    if(props.warning === 'cancel'){
        return (
            <Card>
                <h1>Warning</h1>
                <p className='message'>Are you sure you wish to cancel? All changes will be lost.</p>
                <div className='btn-container'>
                    <Button onClick={props.action}>
                        <p>I'm sure</p>
                    </Button>
                    <Button cancel='true' onClick={props.close}>
                        <p>Cancel</p>
                    </Button>
                </div>
            </Card>
        );
    }
    
}