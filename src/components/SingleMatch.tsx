import { useState } from "react";
import { api } from "~/utils/api";
import TwitterGraphicModal from "./Modal/TwitterGraphic";
import NumberInput from "./Form/NumberInput";
import Toast from "./Toast";
import useToast from "~/hooks/useToast";

type SingleMatchProps = {
  homeTeam: string;
  awayTeam: string;
  division: string;
};

const SingleMatch = ({ homeTeam, awayTeam, division }: SingleMatchProps) => {
  const [homeScore, setHomeScore] = useState(-1);
  const [awayScore, setAwayScore] = useState(-1);
  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const changeModalStatus = (checked: boolean) => {
    setModalStatus(checked);
  };

  const { toastStatus, toastMessage, dispatchToast, clearToast } = useToast();

  const { mutate: generateGraphic } =
    api.matches.createFullTimeGraphic.useMutation({
      onSuccess: ({ base64, altText }) => {
        clearToast();
        setSrc(base64);
        setAltText(altText);
        setModalStatus(true);
      },
    });

  const generateBase64 = (upload: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(upload);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const generateTwitterGraphic = async (file: File) => {
    const base64String = await generateBase64(file);
    generateGraphic({
      homeScore,
      awayScore,
      base64: base64String,
      homeTeam,
      awayTeam,
      division,
    });
  };

  const handleHomeScoreChange = (newHomeScore: string) => {
    const score = parseInt(newHomeScore, 10);
    Number.isNaN(score) ? setHomeScore(-1) : setHomeScore(score);
  };

  const handleAwayScoreChange = (newAwayScore: string) => {
    const score = parseInt(newAwayScore, 10);
    Number.isNaN(score) ? setAwayScore(-1) : setAwayScore(score);
  };

  return (
    <form>
      <div className="mx-auto flex w-full flex-col items-center gap-x-8 gap-y-4 px-2 sm:flex-row">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">How many goals for {homeTeam}?</span>
          </label>
          <NumberInput
            handleChange={handleHomeScoreChange}
            placeholder="Type home score here"
            initialValue={NaN}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">How many goals for {awayTeam}?</span>
          </label>
          <NumberInput
            handleChange={handleAwayScoreChange}
            placeholder="Type away score here"
            initialValue={NaN}
          />
        </div>
      </div>

      {homeScore >= 0 && awayScore >= 0 ? (
        <div className="form-control mx-auto w-full max-w-xs pt-10">
          <label className="label">
            <span className="label-text">Upload the final score graphic</span>
          </label>
          <input
            type="file"
            className="file-input-bordered file-input w-full max-w-xs"
            onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                dispatchToast({
                  type: "SET_WARNING",
                  message: "Creating your final score graphic now...",
                });
                generateTwitterGraphic(event.target.files[0]).catch((error) =>
                  console.error(error)
                );
              }
            }}
          />
          <Toast
            status={toastStatus}
            message={toastMessage}
            clearToast={clearToast}
          />
        </div>
      ) : null}
      {src.length > 0 && modalStatus ? (
        <TwitterGraphicModal
          base64={src}
          altText={altText}
          changeModalStatus={changeModalStatus}
        />
      ) : null}
    </form>
  );
};

export default SingleMatch;
