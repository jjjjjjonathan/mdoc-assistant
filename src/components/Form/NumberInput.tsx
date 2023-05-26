import { useState } from "react";

type NumberInputProps = {
  handleChange?: (numberAsString: string) => void;
  handleShirtNumberChange?: (playerId: number, newShirtNumber: number) => void;
  placeholder: string;
  initialValue: number;
  playerId?: number;
};

const NumberInput = ({
  handleChange,
  placeholder,
  initialValue,
  playerId,
  handleShirtNumberChange,
}: NumberInputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue: string) => {
    if (handleChange) {
      handleChange(newValue);
    }
    if (handleShirtNumberChange && playerId !== undefined) {
      handleShirtNumberChange(playerId, parseInt(newValue, 10));
    }
    setValue(parseInt(newValue, 10));
  };
  return (
    <input
      type="number"
      onChange={(event) => handleValueChange(event.target.value)}
      placeholder={placeholder}
      value={Number.isNaN(value) ? "" : value.toString(10)}
      className="input-bordered input w-full"
    />
  );
};

export default NumberInput;
