import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles({
  root: {
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
  wrap: {
    width: "100%",
    display: "flex",
    // flexDirection: "row-reverse",
    // justifyContent: "space-between",
    // justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 0,
    // display: "grid",
    // grid-template-columns: "repeat(3, 1fr)",
    // grid-gap: "1rem",
  },
  label: {
    fontSize: ".8rem",
    fontFamily: `'Raleway', sans-serif`,
  },
});

const CheckboxProtons = ({ changeCheckeds, region }) => {
  const classes = useStyles();
  const { checked, label, id } = region;
  return (
    <div>
      <FormControlLabel
        classes={{
          label: classes.label,
          root: classes.wrap,
        }}
        control={
          <Checkbox
            classes={{
              checked: classes.checked,
              root: classes.root,
            }}
            size="small"
            checked={checked}
            onChange={() => changeCheckeds(id)}
            inputProps={{ "aria-label": "checkbox with small size" }}
          />
        }
        label={label}
      />
    </div>
  );
};

export default CheckboxProtons;