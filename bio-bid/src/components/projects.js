import React from "react";
import styled from "styled-components";

import {useQuery} from '@apollo/react-hooks';
import {GET_STUDIES} from '../queries';
import ProjectCard from './ProjectCard';

function Projects(){
    const {loading, data, error} = useQuery(GET_STUDIES);
   return (
       <ProjectWrapper>
           <ProjectsTittle> Current Projects </ProjectsTittle>
           <Cards>
                {loading ? <p>Loading...</p>: 
                data.studies.map(study =>
                    <ProjectCard
                        key={study.id}
                        name={study.name}
                        area={study.area}
                        phase={study.phase}/>)}
           </Cards>

       </ProjectWrapper>

    )
};

const ProjectWrapper= styled.div
`
width: 30%;
heigth: 25%;
`

const ProjectsTittle = styled.h1
`
font-family: Lato;
font-style: normal;
font-weight: bold;
font-size: 24px;
line-height: 29px;
margin:10%;
`

const Cards = styled.div
`
display:flex;
flex-direction: column;
justify-content: space-between;
height: 20%;
`
 export default Projects;