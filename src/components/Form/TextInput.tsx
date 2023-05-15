type TextInputProps = {
  handleChange: (text: string) => void;
  placeholder: string;
};

const TextInput = ({ handleChange, placeholder }: TextInputProps) => {
  return (
    <input
      type="text"
      onChange={(event) => handleChange(event.target.value)}
      placeholder={placeholder}
      className="input-bordered input w-full"
    />
  );
};

export default TextInput;
