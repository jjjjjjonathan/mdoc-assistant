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
  const [minute, setMinute] = useState("0");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [midMatchTweet, setMidMatchTweet] = useState("");

  return (
    <div className="flex w-1/2 flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">Pre-match Tweet</h2>
      <input
        type="text"
        onChange={(event) => setStadium(event.target.value)}
        placeholder="Type the name of the field"
        className="input-bordered input w-full"
      />
      <input
        type="text"
        onChange={(event) => setExtraContext(event.target.value)}
        placeholder="Optionally add context to the match"
        className="input-bordered input w-full"
      />
      <textarea
        className="textarea-bordered textarea w-full"
        value={`It’s 30 minutes to kick-off here at ${stadium}.\n\n${homeTeamTwitter} host ${awayTeamTwitter} in ${division} action.${
          extraContext ? `\n\n${extraContext}` : ""
        }\n\n#L1OLive #EveryPointMatters`}
        readOnly={true}
        hidden={!stadium}
      />
      <h2 className="text-2xl font-semibold">Match Update</h2>
      <input
        type="text"
        onChange={(event) =>
          setMinute(event.target.value.length === 0 ? "0" : event.target.value)
        }
        placeholder="Current minute of the match (or HT/FT)"
        className="input-bordered input w-full"
      />
      <input
        type="text"
        onChange={(event) => setMidMatchTweet(event.target.value)}
        placeholder="What's happened in the match?"
        className="input-bordered input w-full"
      />
      <input
        type="number"
        onChange={(event) =>
          setHomeScore(
            event.target.value.length === 0
              ? 0
              : parseInt(event.target.value, 10)
          )
        }
        placeholder={`Goals for ${homeTeamTwitter}`}
        className="input-bordered input w-full"
      />
      <input
        type="number"
        onChange={(event) =>
          setAwayScore(
            event.target.value.length === 0
              ? 0
              : parseInt(event.target.value, 10)
          )
        }
        placeholder={`Goals for ${awayTeamTwitter}`}
        className="input-bordered input w-full"
      />
      <textarea
        className="textarea-bordered textarea w-full"
        value={`${minute}' ${homeTeamTwitter} ${homeScore}-${awayScore} ${awayTeamTwitter}\n\n${midMatchTweet}\n\n#L1OLive${
          minute === "HT" || minute === "FT" ? " #EveryPointMatters" : ""
        }`}
        readOnly={true}
        hidden={minute.length === 0 || midMatchTweet.length === 0}
      />
    </div>
  );
};

export default TweetTemplate;
