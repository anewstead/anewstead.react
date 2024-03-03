import React, { memo } from "react";

import { Checkbox, FormControlLabel } from "@mui/material";

export type HeadNavCheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HeadNavCheckbox = memo(
  ({ id, label, checked, onChange }: HeadNavCheckboxProps) => {
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
  }
);
