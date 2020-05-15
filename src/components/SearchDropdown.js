import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function SearchDropdown({
  collection,
  optionLebel,
  label,
  setter,
  disabled,
}) {
  const [selected, setSelected] = useState(null);
  const defaultProps = {
    options: collection,
    getOptionLabel: (option) => option[optionLebel],
  };

  const handleSelectedChanged = (event, newValue) => {
    setSelected(newValue);
    setter(newValue);
  };

  return (
    <Autocomplete
      {...defaultProps}
      id="Autocomplete"
      value={selected}
      onChange={handleSelectedChanged}
      renderInput={(params) => <TextField {...params} label={label} />}
      disabled={disabled}
    />
  );
}
