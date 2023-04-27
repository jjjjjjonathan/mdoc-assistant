import { useState } from "react";

type TweetTemplateProps = {
  homeTeamTwitter: string;
  awayTeamTwitter: string;
  division: string;
};

const TweetTemplate = ({
  homeTeamTwitter,
  awayTeamTwitter,
  division,
}: TweetTemplateProps) => {
  const [stadium, setStadium] = useState("");
  const [extraContext, setExtraContext] = useState("");

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-xl font-semibold">Pre-match Tweet</h2>
      <input
        type="text"
        onChange={(event) => setStadium(event.target.value)}
        placeholder="Type the name of the field"
        className="input-bordered input w-full max-w-xs"
      />
      <input
        type="text"
        onChange={(event) => setExtraContext(event.target.value)}
        placeholder="Optionally add context to the match"
        className="input-bordered input w-full max-w-xs"
      />
      <textarea
        className="textarea-bordered textarea w-full"
        value={`It’s 30 minutes to kick-off here at ${stadium}.\n\n${homeTeamTwitter} host ${awayTeamTwitter} in ${division} action.${
          extraContext ? `\n\n${extraContext}` : ""
        }\n\n#L1OLive #EveryPointMatters`}
        readOnly={true}
        hidden={!stadium}
      />
    </div>
  );
};

export default TweetTemplate;
