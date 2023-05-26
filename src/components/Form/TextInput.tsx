import { useState } from "react";

type TextInputProps = {
  handleChange?: (text: string) => void;
  placeholder: string;
  initialValue: string;
  handleNameChange?: (playerId: number, playerName: string) => void;
  playerId?: number;
  disabled?: boolean;
};

const TextInput = ({
  handleChange,
  placeholder,
  initialValue,
  handleNameChange,
  playerId,
  disabled,
}: TextInputProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  return (
    <input
      type="text"
      onChange={(event) => {
        setInputValue(event.target.value);
        if (handleChange) {
          handleChange(event.target.value);
        }
        if (handleNameChange && playerId !== undefined) {
          handleNameChange(playerId, event.target.value);
        }
      }}
      placeholder={placeholder}
      className="input-bordered input w-full"
      value={inputValue}
      disabled={disabled || false}
    />
  );
};

export default TextInput;
