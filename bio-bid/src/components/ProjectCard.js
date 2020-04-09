import React from 'react';

function ProjectCard(props) {
   const {name, area, phase} = props;
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{area}</p>
                <p>Phase {phase}</p>
                <a href="#" class=" btn-card">View study</a>
            </div>
        </div>
    );
}

export default ProjectCard;