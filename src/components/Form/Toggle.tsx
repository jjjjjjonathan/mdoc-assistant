type ToggleProps = {
  handleChange: (
    isStarter: boolean,
    toggleSelected: (isSelected: boolean) => void,
    playerId: number
  ) => void;
  toggleSelected: (isSelected: boolean) => void;
  playerId: number;
  checked: boolean;
};

const Toggle = ({
  handleChange,
  toggleSelected,
  playerId,
  checked,
}: ToggleProps) => {
  return (
    <input
      type="checkbox"
      className="toggle-primary toggle"
      checked={checked}
      onChange={(event) => {
        console.log(
          `the toggled is checked, ${!!event.target.checked ? "yes" : "no"}`
        );
        handleChange(!!event.target.checked, toggleSelected, playerId);
      }}
    />
  );
};

export default Toggle;
