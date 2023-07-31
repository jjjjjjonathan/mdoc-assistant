import useCopy from "~/hooks/useCopy";
import classNames from "classnames";

type ClipboardCopyButtonProps = {
  textToCopy: string;
  textType: string;
  disabled?: boolean;
};

const ClipboardCopyButton = ({
  textToCopy,
  textType,
  disabled = false,
}: ClipboardCopyButtonProps) => {
  const [copied, copy, setCopied] = useCopy(textToCopy);

  const copyText = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const copyClasses = classNames("btn", {
    "btn-primary": !copied,
    "btn-success": copied,
  });
  return (
    <button
      className={copyClasses}
      onClick={(event) => {
        event.preventDefault();
        copyText();
      }}
      disabled={disabled}
    >
      {copied ? `Copied ${textType}!` : `Copy ${textType}`}
    </button>
  );
};

export default ClipboardCopyButton;
