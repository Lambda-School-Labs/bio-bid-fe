import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CaretDownOutlined } from "@ant-design/icons";

const useStyles = makeStyles((theme) => ({
  serviceName: {
    paddingLeft: theme.spacing(1),
  },
  specialties: {
    listStyleType: "none",
    paddingLeft: theme.spacing(1),
    transition: "all 0.5s",
  },
  specialtyName: {
    fontSize: 16,
    paddingLeft: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  subs: {
    listStyleType: "none",
    paddingLeft: theme.spacing(1),
    transition: "all 0.5s",
  },
  subName: {
    fontSize: 14,
    paddingLeft: theme.spacing(1),
  },
}));

function Services({ services }) {
  const [open, setOpen] = useState(null);
  const classes = useStyles();

  const handleToggle = (name) => {
    open === name ? setOpen(null) : setOpen(name);
  };

  return services.map((service) => (
    <>
      <h5 key={service.id} className={classes.serviceName}>
        {service.name}
      </h5>
      <ul className={classes.specialties}>
        {service.specialties.map((specialty) => (
          <>
            <li
              className={classes.specialtyName}
              onClick={() => handleToggle(specialty.name)}
            >
              <span>{specialty.name}</span>
              <span>
                <CaretDownOutlined />
              </span>
            </li>
            {open === specialty.name && (
              <ul className={classes.subs}>
                {specialty.sub_specialties.map((sub) => (
                  <li className={classes.subName}>{sub.name}</li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </>
  ));
}

export default Services;
