import { useState } from "react";
import classNames from "classnames";

type CheckboxProps = {
  initialValue: boolean;
  handleChange?: (playerId: number) => void;
  playerId?: number;
  borderColor: "checkbox-secondary" | "checkbox-accent";
};

const Checkbox = ({
  initialValue,
  handleChange,
  playerId,
  borderColor,
}: CheckboxProps) => {
  const checkboxClasses = classNames("checkbox", borderColor);
  const [checked, setChecked] = useState(initialValue);
  return (
    <input
      type="checkbox"
      checked={checked}
      className={checkboxClasses}
      onChange={(event) => {
        setChecked(!!event.target.checked);
        if (handleChange && playerId !== undefined) {
          handleChange(playerId);
        }
      }}
    />
  );
};

export default Checkbox;
