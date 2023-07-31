import { useState, useEffect } from "react";
import TextInput from "./Form/TextInput";
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
  homeTeamName: string;
  awayTeamName: string;
};

const TweetTemplate = ({
  homeTeamTwitter,
  awayTeamTwitter,
  division,
  divisionId,
  homeTeamName,
  awayTeamName,
}: TweetTemplateProps) => {
  const [stadium, setStadium] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [minute, setMinute] = useState("");
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

  const handleExtraContextChange = (newExtraContext: string) => {
    setExtraContext(newExtraContext);
  };

  const handleMinuteChange = (newMinute: string) => {
    setMinute(newMinute.length === 0 ? "0" : newMinute);
  };

  const handleMidMatchTweetChange = (newTweet: string) => {
    setMidMatchTweet(newTweet);
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

  const increaseScore = (isHomeTeam: boolean) => {
    isHomeTeam
      ? setHomeScore((prev) => prev + 1)
      : setAwayScore((prev) => prev + 1);
  };

  const decreaseScore = (isHomeTeam: boolean) => {
    isHomeTeam
      ? setHomeScore((prev) => (prev <= 0 ? 0 : prev - 1))
      : setAwayScore((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  return (
    <div className="grid w-3/4 grid-cols-1 gap-4 md:grid-cols-2">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Match details for tweets</h2>
          <input
            type="text"
            placeholder="Write the name of the field."
            className="input-bordered input w-full"
            value={stadium}
            onChange={(event) => setStadium(event.target.value)}
          />
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Score for {homeTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                className="btn-secondary btn"
                onClick={() => decreaseScore(true)}
              >
                -1
              </button>
              <p>{homeScore}</p>
              <button
                className="btn-accent btn"
                onClick={() => increaseScore(true)}
              >
                +1
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Score for {awayTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                className="btn-secondary btn"
                onClick={() => decreaseScore(false)}
              >
                -1
              </button>
              <p>{awayScore}</p>
              <button
                className="btn-accent btn"
                onClick={() => increaseScore(false)}
              >
                +1
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Pre-match tweet</h2>
          <textarea
            className="textarea-bordered textarea"
            placeholder="Add optional context to the pre-match tweet"
            onChange={(event) => handleExtraContextChange(event.target.value)}
          ></textarea>
          {stadium.length <= 0 ? (
            <TextArea text="Write the name of the field and a pre-match tweet will generate." />
          ) : (
            <TextArea text={preMatchTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={preMatchTweet}
              textType="pre-match tweet"
              disabled={stadium.length <= 0}
            />
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Kickoff tweet</h2>
          <textarea
            className="textarea-bordered textarea"
            placeholder="Add context to the kickoff tweet"
            onChange={(event) => handleKickoffTweetChange(event.target.value)}
          ></textarea>
          {kickoffContent.length <= 0 ? (
            <TextArea text="Write something for kickoff and a tweet will generate." />
          ) : (
            <TextArea text={kickoffTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={kickoffTweet}
              textType="kickoff tweet"
              disabled={kickoffContent.length <= 0}
            />
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Mid-match update</h2>
          <TextInput
            handleChange={handleMinuteChange}
            placeholder="Current minute of the match"
            initialValue=""
          />
          <textarea
            className="textarea-bordered textarea"
            placeholder="What happened in the match?"
            onChange={(event) => handleMidMatchTweetChange(event.target.value)}
          ></textarea>
          {midMatchTweet.length <= 0 || minute.length <= 0 ? (
            <TextArea text="Put down the minute and write a description of what happened in the match, and a tweet will generate." />
          ) : (
            <TextArea text={matchTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={matchTweet}
              textType="match tweet"
              disabled={midMatchTweet.length <= 0 || minute.length <= 0}
            />
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Goal tweet</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Goal for {isHomeGoal ? homeTeamName : awayTeamName}
              </span>
              <input
                type="checkbox"
                className="toggle-primary toggle"
                checked={isHomeGoal}
                onChange={(event) => setIsHomeGoal(!!event.target.checked)}
              />
            </label>
          </div>

          <TextInput
            handleChange={handleGoalMinuteChange}
            placeholder={`Minute for goal`}
            initialValue={""}
          />
          <textarea
            className="textarea-bordered textarea"
            placeholder="Describe the goal."
            onChange={(event) => setGoalContent(event.target.value)}
          ></textarea>

          {goalContent.length <= 0 || goalMinute.length <= 0 ? (
            <TextArea text="Write the minute and description of a goal, and a tweet will generate." />
          ) : (
            <TextArea text={goalTweet} />
          )}

          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={goalTweet}
              textType="goal tweet"
              disabled={goalContent.length <= 0 || goalMinute.length <= 0}
            />
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Red card tweet</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Red Card for {isHomeRedCard ? homeTeamName : awayTeamName}
              </span>
              <input
                type="checkbox"
                className="toggle-primary toggle"
                checked={isHomeRedCard}
                onChange={(event) => setIsHomeRedCard(!!event.target.checked)}
              />
            </label>
          </div>

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

          {redCardPlayer.length <= 0 || redCardMinute.length <= 0 ? (
            <TextArea text="Write the minute and player name for a red card, and a tweet will generate." />
          ) : (
            <TextArea text={redCardTweet} />
          )}

          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={redCardTweet}
              textType="red card tweet"
              disabled={redCardPlayer.length <= 0 || redCardMinute.length <= 0}
            />
          </div>
        </div>
      </div>

      <div className="=bg-base-100 card shadow-xl">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Halftime/Fulltime Tweet</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Tweet is for {isFullTime ? "full-time" : "half-time"}
              </span>
              <input
                type="checkbox"
                className="toggle-primary toggle"
                checked={isFullTime}
                onChange={(event) => setIsFullTime(!!event.target.checked)}
              />
            </label>
          </div>
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Score for {homeTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                className="btn-secondary btn"
                onClick={() => decreaseScore(true)}
              >
                -1
              </button>
              <p>{homeScore}</p>
              <button
                className="btn-accent btn"
                onClick={() => increaseScore(true)}
              >
                +1
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Score for {awayTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                className="btn-secondary btn"
                onClick={() => decreaseScore(false)}
              >
                -1
              </button>
              <p>{awayScore}</p>
              <button
                className="btn-accent btn"
                onClick={() => increaseScore(false)}
              >
                +1
              </button>
            </div>
          </div>
          <input
            type="text"
            placeholder="Write the name of the field."
            className="input-bordered input w-full"
            value={stadium}
            onChange={(event) => setStadium(event.target.value)}
          />
          <textarea
            className="textarea-bordered textarea"
            placeholder="Describe the events of the half."
            onChange={(event) => setBreakContent(event.target.value)}
          ></textarea>
          {stadium.length <= 0 || breakContent.length <= 0 ? (
            <TextArea text="Write the minute and player name for a red card, and a tweet will generate." />
          ) : (
            <TextArea text={breakTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={breakTweet}
              textType="break tweet"
              disabled={stadium.length <= 0 || breakContent.length <= 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetTemplate;
