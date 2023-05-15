type NumberInputProps = {
  handleChange: (numberAsString: string) => void;
  placeholder: string;
};

const NumberInput = ({ handleChange, placeholder }: NumberInputProps) => {
  return (
    <input
      type="number"
      onChange={(event) => handleChange(event.target.value)}
      placeholder={placeholder}
      className="input-bordered input w-full"
    />
  );
};

export default NumberInput;
