import type { RosterPlayerType } from "~/server/api/routers/players";

type ToggleProps = {
  handleChange: (
    isStarter: boolean,
    toggleSelected: (isSelected: boolean) => void,
    player: RosterPlayerType
  ) => void;
  toggleSelected: (isSelected: boolean) => void;
  player: RosterPlayerType;
  checked: boolean;
};

const Toggle = ({
  handleChange,
  toggleSelected,
  player,
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
        handleChange(!!event.target.checked, toggleSelected, player);
      }}
    />
  );
};

export default Toggle;
