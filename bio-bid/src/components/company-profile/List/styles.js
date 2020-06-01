import styled from 'styled-components';
import theme from '../../../theme';

export const CompanyList = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    header{
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: center;
        background-color: ${theme.colors.scienceBlue};
        .header-container{
            width: 80%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            h2{
                margin: 0;
                font: ${theme.fontStyling.header2};
                color: ${theme.colors.alabaster};
            }
            .search-container{
                display: flex;
                align-items: center;
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
    }
`;

export const CompanyCard = styled.div`
    width: 80%;
    height: 250px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.silver};
    img{
        width: 200px;
        height: 200px;
    }
    .content{
        display: flex;
        justify-content: space-between;
        width: 100%;
        .text{
            margin-left: 20px;
            h3{
                font: ${theme.fontStyling.header3};
                font-weight: bold;
            }
            .details{
                margin-top: 10px;
                p{
                    margin: 0;
                    margin-top: 5px;
                    font: ${theme.fontStyling.text};
                    span{
                        font-weight: bold;
                    }
                }
            }
            .btn-container{
                margin-top: 30px;
                width: 100%;
                height: 50px;
                display: flex;
                a{
                    text-decoration: none;
                }
            }
        }
        .overview{
            width: 300px;
            .bold{
                font: ${theme.fontStyling.text};
                font-weight: bold;
            }
        }
    }
`;

export const Button = styled.div`
    width: 130px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.cancel ? theme.colors.sun : theme.colors.scienceBlue};
    background-color: ${theme.colors.alabaster};
    color: ${theme.colors.scienceBlue};
    cursor: pointer;
    p{
        margin-bottom: 0 !important;
        font: ${theme.fontStyling.text};
        color: inherit;
    }
    &:hover{
        background-color: ${theme.colors.silver};
        color: ${theme.colors.alabaster};
    }
`;

export const CardButton = styled.div`
    margin-right: 10px;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid ${props => props.gray ? theme.colors.laPalma : theme.colors.scienceBlue};
    background-color: ${props => props.gray ? theme.colors.laPalma : theme.colors.scienceBlue};
    color: ${theme.colors.alabaster};
    cursor: pointer;
    p{
        margin: 0;
        font: ${theme.fontStyling.text};
        color: inherit;
    }
    &:hover{
        background-color: ${theme.colors.alabaster};
        color: ${props => props.gray ? theme.colors.laPalma : theme.colors.scienceBlue};
    }
`;