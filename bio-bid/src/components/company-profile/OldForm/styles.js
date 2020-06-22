import styled from 'styled-components';
import theme from '../../../theme';
import { LinkedinSquare } from '@styled-icons/boxicons-logos'

export const Body= styled.div`
    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .body{
        margin: 0 auto;
        margin-top: 30px;
        width: 90%;
        .header-wrapper{
            margin-top: 50px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h1{
                font: ${theme.fontStyling.header2};
                color: ${theme.colors.mineShaft};
            }
            .btn-container{
                display: flex;
                justify-content: flex-end;
                width: 300px;
            }
        }
        .bar{
            width: 100%;
            height: 1px;
            background-color: ${theme.colors.scienceBlue};
        }
    }
`;

export const HeaderError = styled.div`
    display: ${props => props.display ? 'flex' : 'none'};
    position: absolute;
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.torchRead};
    p{
        font: ${theme.fontStyling.text};
        margin: 0;
        color: ${theme.colors.alabaster};
    }
`;

export const SucceessMessage = styled.div`
    display: ${props => props.display ? 'flex' : 'none'};
    position: absolute;
    height: 50px;
    width: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.laPalma};
    p{
        font: ${theme.fontStyling.text};
        margin: 0;
        color: ${theme.colors.alabaster};
    }
`;

export const Button = styled.div`
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${props => props.noMargin ? '0' : '20px'};
    border-radius: 10px;
    border: 1px solid ${props => props.cancel ? theme.colors.sun : theme.colors.scienceBlue};
    background-color: ${props => props.cancel ? theme.colors.sun : theme.colors.scienceBlue};
    color: ${theme.colors.alabaster};
    cursor: pointer;
    p{
        margin-bottom: 0 !important;
        font: ${theme.fontStyling.text};
        color: inherit;
    }
    &:hover{
        background-color: ${theme.colors.alabaster};
        color: ${props => props.cancel ? theme.colors.sun : theme.colors.scienceBlue};
    }
`;

export const Form = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    height: 800px;
    .background-asset{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        width: 800px;
        opacity: 0.6;
        z-inedx: -1;
    }
    .top-row{
        display: flex;
        z-index: 1;
        position: absolute;
        width: 100%;
        justify-content: center;
        .side-bar{
            display: flex;
            flex-direction: column;
            align-items: center;
            img{
                border-radius: 50%;
                border: 1px solid ${theme.colors.mineShaft};
                width: 200px;
                height: 200px;
                margin-bottom: 20px;
            }
        }
        .col-custom{
            width: 480px;
            height: 280px;
            padding: 0;
            margin-left: 50px;
            .error{
                color: red;
                margin: 0;
            }
            .input-container{
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
                label{
                    font: ${theme.fontStyling.text};
                    margin: 0;
                }
                input{
                    width: 250px;
                    height: 30px;
                    border-radius: 5px;
                    border: 1px solid ${theme.colors.silver};
                    padding-left: 8px;
                    outline: none;
                    &:focus{
                        box-shadow: 0 0 5px ${theme.colors.scienceBlue};
                    }
                }
                textarea{
                    resize: none;
                    width: 250px;
                    height: 100px;
                    border-radius: 5px;
                    border: 1px solid ${theme.colors.silver};
                    padding-left: 8px;
                    outline: none;
                    &:focus{
                        box-shadow: 0 0 5px ${theme.colors.scienceBlue};
                    }
                }   
                select{
                    width: 250px;
                    height: 30px;
                    border-radius: 5px;
                    border: 1px solid ${theme.colors.silver};
                    background-color: #FFFFFF;
                    outline: none;
                    &:focus{
                        box-shadow: 0 0 5px ${theme.colors.scienceBlue};
                    }
                }   
            }
        }
    }
    .bottom-row{
        display: flex;
        position: absolute;
        z-index: 1;
        margin-top: 350px;
        width: 100%;
        justify-content: center;
        .multi-container{
            display: flex;
            flex-direction: column;
            width: 250px;
            margin: 0 20px;
            label{
                font: ${theme.fontStyling.text};
                margin: 0;
                margin-bottom: 10px;
            }
            input{
                width: 250px;
                height: 30px;
                border-radius: 5px;
                border: 1px solid ${theme.colors.silver};
                padding-left: 8px;
                outline: none;
                &:focus{
                    box-shadow: 0 0 5px ${theme.colors.scienceBlue};
                }
            }
        }
    }
`;

export const LinkedIn = styled(LinkedinSquare)`
    width: 30px;
    color: inherit;
`;

export const Card = styled.div`
    width: 400px;
    height: 200px;
    background-color: ${theme.colors.alabaster};
    border-radius: 10px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1{
        font: ${theme.fontStyling.header2};
        color: ${theme.colors.torchRead};
    }
    .message{
        font: ${theme.fontStyling.text};
        color: ${theme.colors.mineShaft};
    }
    .btn-container{
        color: ${theme.colors.alabaster};
        display: flex;
    }
`;