import Image from "next/image";
import ClipboardCopyButton from "../ClipboardCopyButton";

type TwitterGraphicModalProps = {
  changeModalStatus: (checked: boolean) => void;
  base64: string;
  altText: string;
};

const TwitterGraphicModal = ({
  changeModalStatus,
  base64,
  altText,
}: TwitterGraphicModalProps) => {
  return (
    <>
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
        defaultChecked
        onChange={(event) => changeModalStatus(event.target.checked)}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex flex-col gap-y-4">
            <h3 className="text-lg font-bold">
              Save the image to post on Twitter
            </h3>
            <Image
              src={base64}
              alt={altText}
              width={400}
              height={400}
              className="mx-auto"
            />
            <p className="font-semibold">
              Then copy the text below to attach to it as alt text on Twitter.
            </p>
            <textarea
              value={altText}
              readOnly={true}
              className="textarea-bordered textarea w-full"
            />
          </div>
          <div className="modal-action">
            <ClipboardCopyButton textToCopy={altText} textType="alt text" />
            <label htmlFor="my-modal-6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwitterGraphicModal;
