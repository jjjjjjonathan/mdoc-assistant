import { useState } from "react";
import TextInput from "./Form/TextInput";
import NumberInput from "./Form/NumberInput";
import { generateKickoffTweet, generateMatchTweet } from "~/utils/helpers";
import TextArea from "./Form/TextArea";

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

  const handleStadiumChange = (newStadium: string) => {
    setStadium(newStadium);
  };

  const handleExtraContextChange = (newExtraContext: string) => {
    setExtraContext(newExtraContext);
  };

  const handleMinuteChange = (newMinute: string) => {
    setMinute(newMinute.length === 0 ? "0" : newMinute);
  };

  const handleMidMatchTweetChange = (newTweet: string) => {
    setMidMatchTweet(newTweet);
  };

  const handleHomeScoreChange = (newScore: string) => {
    setHomeScore(newScore.length === 0 ? 0 : parseInt(newScore, 10));
  };

  const handleAwayScoreChange = (newScore: string) => {
    setAwayScore(newScore.length === 0 ? 0 : parseInt(newScore, 10));
  };

  return (
    <div className="flex w-1/2 flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">Pre-match Tweet</h2>
      <TextInput
        handleChange={handleStadiumChange}
        placeholder="Type the name of the field comp"
      />
      <TextInput
        handleChange={handleExtraContextChange}
        placeholder="Optionally add context to the match"
      />
      {stadium ? (
        <TextArea
          text={generateKickoffTweet(
            stadium,
            homeTeamTwitter,
            awayTeamTwitter,
            division,
            extraContext
          )}
        />
      ) : null}
      <h2 className="text-2xl font-semibold">Match Update</h2>
      <TextInput
        handleChange={handleMinuteChange}
        placeholder="Current minute of the match (or HT/FT)"
      />
      <TextInput
        handleChange={handleMidMatchTweetChange}
        placeholder="What happened in the match?"
      />
      <NumberInput
        handleChange={handleHomeScoreChange}
        placeholder={`Goals for ${homeTeamTwitter}`}
      />
      <NumberInput
        handleChange={handleAwayScoreChange}
        placeholder={`Goals for ${awayTeamTwitter}`}
      />
      {minute && midMatchTweet.length > 0 ? (
        <TextArea
          text={generateMatchTweet(
            minute,
            homeTeamTwitter,
            awayTeamTwitter,
            homeScore,
            awayScore,
            midMatchTweet
          )}
        />
      ) : null}
    </div>
  );
};

export default TweetTemplate;
