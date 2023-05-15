type TextAreaProps = {
  text: string;
};

const TextArea = ({ text }: TextAreaProps) => {
  return (
    <textarea
      className="textarea-bordered textarea w-full"
      value={text}
      readOnly={true}
    />
  );
};

export default TextArea;
