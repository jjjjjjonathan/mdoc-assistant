import { useState, useEffect } from "react";
import TextInput from "./Form/TextInput";
import NumberInput from "./Form/NumberInput";
import {
  generatePreMatchTweet,
  generateMatchTweet,
  generateKickoffTweet,
  generateGoalTweet,
  generateRedCardTweet,
  generateBreakTweet,
} from "~/utils/helpers";
import TextArea from "./Form/TextArea";
import ClipboardCopyButton from "./ClipboardCopyButton";

type TweetTemplateProps = {
  homeTeamTwitter: string;
  awayTeamTwitter: string;
  division: string;
  divisionId: number;
};

const TweetTemplate = ({
  homeTeamTwitter,
  awayTeamTwitter,
  division,
  divisionId,
}: TweetTemplateProps) => {
  const [stadium, setStadium] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [minute, setMinute] = useState("0");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [midMatchTweet, setMidMatchTweet] = useState("");
  const [preMatchTweet, setPreMatchTweet] = useState("");
  const [kickoffContent, setKickoffContent] = useState("");
  const [kickoffTweet, setKickoffTweet] = useState("");
  const [matchTweet, setMatchTweet] = useState("");

  const [goalMinute, setGoalMinute] = useState("");
  const [isHomeGoal, setIsHomeGoal] = useState(false);
  const [goalContent, setGoalContent] = useState("");
  const [goalTweet, setGoalTweet] = useState("");
  const [redCardPlayer, setRedCardPlayer] = useState("");
  const [isHomeRedCard, setIsHomeRedCard] = useState(false);
  const [redCardMinute, setRedCardMinute] = useState("");
  const [redCardTweet, setRedCardTweet] = useState("");
  const [breakContent, setBreakContent] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);
  const [breakTweet, setBreakTweet] = useState("");

  useEffect(() => {
    setPreMatchTweet(
      generatePreMatchTweet(
        stadium,
        homeTeamTwitter,
        awayTeamTwitter,
        division,
        extraContext,
        divisionId
      )
    );
  }, [
    stadium,
    extraContext,
    homeTeamTwitter,
    awayTeamTwitter,
    division,
    divisionId,
  ]);

  useEffect(() => {
    setMatchTweet(
      generateMatchTweet(
        minute,
        homeTeamTwitter,
        awayTeamTwitter,
        homeScore,
        awayScore,
        midMatchTweet,
        divisionId
      )
    );
  }, [
    minute,
    homeTeamTwitter,
    awayTeamTwitter,
    homeScore,
    awayScore,
    midMatchTweet,
    divisionId,
  ]);

  useEffect(() => {
    setKickoffTweet(
      generateKickoffTweet(
        kickoffContent,
        homeTeamTwitter,
        awayTeamTwitter,
        divisionId
      )
    );
  }, [kickoffContent, homeTeamTwitter, awayTeamTwitter, divisionId]);

  useEffect(() => {
    setGoalTweet(
      generateGoalTweet(
        goalContent,
        homeTeamTwitter,
        homeScore,
        awayTeamTwitter,
        awayScore,
        isHomeGoal,
        goalMinute,
        divisionId
      )
    );
  }, [
    goalContent,
    homeTeamTwitter,
    homeScore,
    awayTeamTwitter,
    awayScore,
    isHomeGoal,
    goalMinute,
    divisionId,
  ]);

  useEffect(() => {
    setRedCardTweet(
      generateRedCardTweet(
        redCardMinute,
        redCardPlayer,
        homeTeamTwitter,
        homeScore,
        awayTeamTwitter,
        awayScore,
        isHomeRedCard,
        divisionId
      )
    );
  }, [
    redCardMinute,
    redCardPlayer,
    isHomeRedCard,
    awayScore,
    homeScore,
    awayTeamTwitter,
    homeTeamTwitter,
    divisionId,
  ]);

  useEffect(() => {
    setBreakTweet(
      generateBreakTweet(
        stadium,
        homeTeamTwitter,
        homeScore,
        awayTeamTwitter,
        awayScore,
        breakContent,
        isFullTime,
        divisionId
      )
    );
  }, [
    stadium,
    homeTeamTwitter,
    homeScore,
    awayTeamTwitter,
    awayScore,
    breakContent,
    isFullTime,
    divisionId,
  ]);

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

  const handleKickoffTweetChange = (newTweet: string) => {
    setKickoffContent(newTweet);
  };

  const handleGoalMinuteChange = (newMinute: string) => {
    setGoalMinute(newMinute);
  };

  const handleRedCardMinuteChange = (newMinute: string) => {
    setRedCardMinute(newMinute);
  };

  const handleRedCardPlayerChange = (newPlayer: string) => {
    setRedCardPlayer(newPlayer);
  };

  const handleBreakContentChange = (newTweet: string) => {
    setBreakContent(newTweet);
  };

  return (
    <div className="flex w-1/2 flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">Pre-match Tweet</h2>
      <TextInput
        handleChange={handleStadiumChange}
        placeholder="Type the name of the field"
        initialValue=""
      />
      <TextInput
        handleChange={handleExtraContextChange}
        placeholder="Optionally add context to the match"
        initialValue=""
      />
      {stadium ? (
        <>
          <TextArea text={preMatchTweet} />
          <ClipboardCopyButton
            textToCopy={preMatchTweet}
            textType="pre-match tweet"
          />
        </>
      ) : null}

      <h2 className="text-2xl font-semibold">Kickoff Tweet</h2>
      <TextInput
        handleChange={handleKickoffTweetChange}
        placeholder="Type kickoff tweet content"
        initialValue=""
      />
      {kickoffContent ? (
        <>
          <TextArea text={kickoffTweet} />
          <ClipboardCopyButton
            textToCopy={kickoffTweet}
            textType="kickoff tweet"
          />
        </>
      ) : null}
      <h2 className="text-2xl font-semibold">Match Update</h2>
      <TextInput
        handleChange={handleMinuteChange}
        placeholder="Current minute of the match"
        initialValue=""
      />
      <TextInput
        handleChange={handleMidMatchTweetChange}
        placeholder="What happened in the match?"
        initialValue=""
      />
      <NumberInput
        handleChange={handleHomeScoreChange}
        placeholder={`Goals for ${homeTeamTwitter}`}
        initialValue={NaN}
      />
      <NumberInput
        handleChange={handleAwayScoreChange}
        placeholder={`Goals for ${awayTeamTwitter}`}
        initialValue={NaN}
      />
      {minute.length > 0 && minute !== "0" && midMatchTweet.length > 0 ? (
        <>
          <TextArea text={matchTweet} />
          <ClipboardCopyButton textToCopy={matchTweet} textType="match tweet" />
        </>
      ) : null}
      <h2 className="text-2xl font-semibold">Goal Tweet</h2>
      <TextInput
        handleChange={handleGoalMinuteChange}
        placeholder={`Minute for goal`}
        initialValue={""}
      />
      <div className="flex flex-row gap-x-2">
        <label htmlFor="">
          Check if it&apos;s a home goal, leave unchecked if it&apos;s an away
          goal
        </label>
        <input
          type="checkbox"
          checked={isHomeGoal}
          onChange={(event) => setIsHomeGoal(!!event.target.checked)}
          className="checkbox-primary checkbox"
        />
      </div>
      <TextInput
        handleChange={setGoalContent}
        placeholder={`What happened in the goal?`}
        initialValue={""}
      />
      {goalMinute.length > 0 && goalMinute !== "0" && goalTweet.length > 0 ? (
        <>
          <TextArea text={goalTweet} />
          <ClipboardCopyButton textToCopy={goalTweet} textType="goal tweet" />
        </>
      ) : null}
      <h2 className="text-2xl font-semibold">Red Card Tweet</h2>
      <TextInput
        handleChange={handleRedCardMinuteChange}
        placeholder={`Minute for red card`}
        initialValue={""}
      />
      <TextInput
        handleChange={handleRedCardPlayerChange}
        placeholder={`Player for red card`}
        initialValue={""}
      />
      <div className="flex flex-row gap-x-2">
        <label htmlFor="">
          Check if it&apos;s a home red card, leave unchecked if it&apos;s an
          away red card
        </label>
        <input
          type="checkbox"
          checked={isHomeRedCard}
          onChange={(event) => setIsHomeRedCard(!!event.target.checked)}
          className="checkbox-secondary checkbox"
        />
      </div>
      {redCardMinute.length > 0 &&
      redCardMinute !== "0" &&
      redCardPlayer.length > 0 ? (
        <>
          <TextArea text={redCardTweet} />
          <ClipboardCopyButton
            textToCopy={redCardTweet}
            textType="red card tweet"
          />
        </>
      ) : null}
      <h2 className="text-2xl font-semibold">Break Tweet</h2>
      <TextInput
        handleChange={handleBreakContentChange}
        placeholder={`Give context for tweet at HT/FT`}
        initialValue={""}
      />
      <div className="flex flex-row gap-x-2">
        <label htmlFor="">
          Check if it&apos;s full-time, leave unchecked if it&apos;s half-time
        </label>
        <input
          type="checkbox"
          checked={isFullTime}
          onChange={(event) => setIsFullTime(!!event.target.checked)}
          className="checkbox-accent checkbox"
        />
      </div>
      {stadium.length > 0 && breakContent.length > 0 ? (
        <>
          <TextArea text={breakTweet} />
          <ClipboardCopyButton textToCopy={breakTweet} textType="break tweet" />
        </>
      ) : null}
    </div>
  );
};

export default TweetTemplate;
