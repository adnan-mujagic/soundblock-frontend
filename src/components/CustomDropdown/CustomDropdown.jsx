import { Menu, MenuItem } from "@mui/material";
import React from "react";
import colors from "../../utils/colors";
import { songCategories } from "../../utils/songCategories";
import typography from "../../utils/typography";
import CustomButtonFilled from "../CustomButtonFilled";

function CustomDropdown({
  placeholder,
  selectedOption,
  setSelectedOption,
  options,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedOptionExists = selectedOption && selectedOption !== "";

  return (
    <div style={{ marginTop: selectedOptionExists ? "0" : "24px" }}>
      {selectedOptionExists && (
        <div
          data-testid="selected-option"
          style={{
            fontSize: typography.tiny,
            margin: "10px 0",
            padding: "5px",
            borderRadius: "4px",
            color: "white",
            width: "fit-content",
            backgroundColor:
              songCategories.find(
                (category) => category.name === selectedOption
              )?.color || colors.green,
          }}
        >
          {selectedOption}
        </div>
      )}
      <CustomButtonFilled text={placeholder} onClick={handleClick} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option, idx) => {
          return (
            <MenuItem
              data-testid={`item-${idx}`}
              key={option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default CustomDropdown;
