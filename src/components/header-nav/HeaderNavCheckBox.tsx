import React, { memo } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const HeaderNavCheckBox = (props: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { id, label, checked, onChange } = props;
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          id={id}
          color="default"
          checked={checked}
          onChange={onChange}
        />
      }
    />
  );
};

export default memo(HeaderNavCheckBox);