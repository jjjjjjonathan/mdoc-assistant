import classNames from "classnames";

type TextAreaProps = {
  text: string;
};

const TextArea = ({ text }: TextAreaProps) => {
  const textareaClasses = classNames("textarea", "w-full", {
    "textarea-bordered": text.length < 260,
    "textarea-warning": text.length >= 260 && text.length <= 280,
    "textarea-error": text.length > 280,
  });

  return <textarea className={textareaClasses} value={text} readOnly={true} />;
};

export default TextArea;
