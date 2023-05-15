import useCopy from "use-copy";
import classNames from "classnames";

type ClipboardCopyButtonProps = {
  textToCopy: string;
  textType: string;
};

const ClipboardCopyButton = ({
  textToCopy,
  textType,
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
    >
      {copied ? `Copied ${textType}!` : `Copy ${textType}`}
    </button>
  );
};

export default ClipboardCopyButton;
