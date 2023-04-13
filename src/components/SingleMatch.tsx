import { useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import TwitterGraphicModal from "./Modal/TwitterGraphic";

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

  const { mutate: generateGraphic } =
    api.matches.createFullTimeGraphic.useMutation({
      onSuccess: ({ base64, altText }) => {
        setSrc(base64);
        setAltText(altText);
      },
    });

  const generateBase64 = (upload: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(upload);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const testFn = async (
    file: File | undefined
  ): Promise<string | undefined> => {
    if (file) {
      return (await generateBase64(file)) as Promise<string>;
    }
  };

  return (
    <form>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">How many goals for {homeTeam}?</span>
        </label>
        <input
          type="number"
          placeholder="Type score here"
          className="input-bordered input w-full max-w-xs"
          onChange={(event) => {
            const score = parseInt(event.target.value, 10);
            Number.isNaN(score) ? setHomeScore(-1) : setHomeScore(score);
          }}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">How many goals for {awayTeam}?</span>
        </label>
        <input
          type="number"
          placeholder="Type score here"
          className="input-bordered input w-full max-w-xs"
          onChange={(event) => {
            const score = parseInt(event.target.value, 10);
            Number.isNaN(score) ? setAwayScore(-1) : setAwayScore(score);
          }}
        />
      </div>
      {homeScore >= 0 && awayScore >= 0 && (
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Pick a file</span>
          </label>
          <input
            type="file"
            className="file-input-bordered file-input w-full max-w-xs"
            onChange={(event) => {
              if (event.target.files) {
                testFn(event.target.files[0])
                  .then((base64) => {
                    generateGraphic({
                      homeScore,
                      awayScore,
                      base64: base64 as string,
                      homeTeam,
                      awayTeam,
                      division,
                    });
                  })
                  .catch((error) => console.log(error));
              }
            }}
          />
        </div>
      )}
      {src.length > 0 && (
        <TwitterGraphicModal
          base64={src}
          altText={altText}
          changeModalStatus={changeModalStatus}
        />
      )}
    </form>
  );
};

export default SingleMatch;
