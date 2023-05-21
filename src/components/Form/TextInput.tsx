import { useState } from "react";

type TextInputProps = {
  handleChange?: (text: string) => void;
  placeholder: string;
  initialValue: string;
};

const TextInput = ({
  handleChange,
  placeholder,
  initialValue,
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
      }}
      placeholder={placeholder}
      className="input-bordered input w-full"
      value={inputValue}
    />
  );
};

export default TextInput;
