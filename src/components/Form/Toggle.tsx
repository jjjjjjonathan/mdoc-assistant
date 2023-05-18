import { useState } from "react";

type ToggleProps = {
  handleChange: (
    isStarter: boolean,
    toggleSelected: (isSelected: boolean) => void,
    playerId: number
  ) => void;
  toggleSelected: (isSelected: boolean) => void;
  playerId: number;
};

const Toggle = ({ handleChange, toggleSelected, playerId }: ToggleProps) => {
  const [toggled, setToggled] = useState(false);
  return (
    <input
      type="checkbox"
      className="toggle-primary toggle"
      checked={toggled}
      onChange={(event) => {
        console.log(
          `the toggled is checked, ${!!event.target.checked ? "yes" : "no"}`
        );
        setToggled(!toggled);
        handleChange(event.target.checked, toggleSelected, playerId);
      }}
    />
  );
};

export default Toggle;
