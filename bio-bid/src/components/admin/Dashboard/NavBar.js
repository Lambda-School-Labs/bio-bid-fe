import React, { useState } from "react";
import {
  NavBar,
  ButtonContainer,
  Arrow,
  Information,
  Request,
  HomeIcon,
} from "./styles";

export default (props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <NavBar open={open}>
      <div className="top">
        <Arrow className="expand" onClick={toggleOpen} open={open} />
        <img
          className="profile-img"
          src="https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        />
        <p>
          {props.userInfo.given_name}<br/>{props.userInfo.family_name}
        </p>
      </div>
      <div className="bar" />
      <div className="btn-wrapper">
        <ButtonContainer
          selected={props.selected === "0"}
          open={open}
          onClick={() => props.changeSelected("0")}
        >
          <HomeIcon />
          {open && <p>Home</p>}
        </ButtonContainer>
        <ButtonContainer
          selected={props.selected === "1"}
          open={open}
          onClick={() => props.changeSelected("1")}
        >
          <Request />
          {open && <p>Claim Requests</p>}
        </ButtonContainer>
        <ButtonContainer
          selected={props.selected === "2"}
          open={open}
          onClick={() => props.changeSelected("2")}
        >
          <Information />
          {open && <p>Information</p>}
        </ButtonContainer>
      </div>
      <div className="bar" />
      <div className="function-container"></div>
    </NavBar>
  );
};
