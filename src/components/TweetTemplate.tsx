import { useState } from "react";
import { api } from "~/utils/api";
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
import Toast from "./Toast";
import useMatchState from "~/hooks/useMatchState";
import useToast from "~/hooks/useToast";
import TwitterGraphicModal from "./Modal/TwitterGraphic";

type TweetTemplateProps = {
  homeTeamTwitter: string;
  awayTeamTwitter: string;
  division: string;
  divisionId: number;
  homeTeamName: string;
  awayTeamName: string;
  hashtags: string[];
  isNeutral: boolean;
  isForChampionship: boolean;
};

const TweetTemplate = ({
  homeTeamTwitter,
  awayTeamTwitter,
  division,
  divisionId,
  homeTeamName,
  awayTeamName,
  hashtags,
  isNeutral,
  isForChampionship,
}: TweetTemplateProps) => {
  const { state, dispatch } = useMatchState();
  const [stadium, setStadium] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [minute, setMinute] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [midMatchTweet, setMidMatchTweet] = useState("");
  const [kickoffContent, setKickoffContent] = useState("");

  const [goalMinute, setGoalMinute] = useState("");
  const [isHomeGoal, setIsHomeGoal] = useState(false);
  const [goalContent, setGoalContent] = useState("");
  const [redCardPlayer, setRedCardPlayer] = useState("");
  const [isHomeRedCard, setIsHomeRedCard] = useState(false);
  const [redCardMinute, setRedCardMinute] = useState("");
  const [breakContent, setBreakContent] = useState("");
  const [isFullTime, setIsFullTime] = useState(false);

  const [src, setSrc] = useState("");
  const [altText, setAltText] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [homePenalties, setHomePenalties] = useState(0);
  const [awayPenalties, setAwayPenalties] = useState(0);
  const [isMatchWithPenalties, setIsMatchWithPenalties] = useState(false);
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
      homeTeam: homeTeamName,
      awayTeam: awayTeamName,
      division,
      divisionId,
      homePenalties,
      awayPenalties,
      isMatchWithPenalties,
    });
  };

  const preMatchTweet = generatePreMatchTweet(
    stadium,
    homeTeamTwitter,
    awayTeamTwitter,
    division,
    extraContext,
    hashtags,
    isNeutral,
    isForChampionship
  );

  const kickoffTweet = generateKickoffTweet(
    kickoffContent,
    homeTeamTwitter,
    awayTeamTwitter,
    hashtags
  );

  const matchTweet = generateMatchTweet(
    minute,
    homeTeamTwitter,
    awayTeamTwitter,
    homeScore,
    awayScore,
    midMatchTweet,
    hashtags
  );

  const goalTweet = generateGoalTweet(
    goalContent,
    homeTeamTwitter,
    homeScore,
    awayTeamTwitter,
    awayScore,
    isHomeGoal,
    goalMinute,
    hashtags
  );

  const redCardTweet = generateRedCardTweet(
    redCardMinute,
    redCardPlayer,
    homeTeamTwitter,
    homeScore,
    awayTeamTwitter,
    awayScore,
    isHomeRedCard,
    hashtags
  );

  const breakTweet = generateBreakTweet(
    stadium,
    homeTeamTwitter,
    homeScore,
    awayTeamTwitter,
    awayScore,
    breakContent,
    isFullTime,
    hashtags
  );

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

  const handleScoreDecrease = (team: "home" | "away") => {
    if (state.scores[team] > 0) {
      dispatch({
        type: "CHANGE_SCORE",
        payload: {
          scoreUpdate: {
            team,
            scoreChange: -1,
          },
        },
      });
    }
  };

  const handleScoreIncrease = (team: "home" | "away") => {
    dispatch({
      type: "CHANGE_SCORE",
      payload: {
        scoreUpdate: {
          team,
          scoreChange: 1,
        },
      },
    });
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

  const increasePenalties = (isHomeTeam: boolean) => {
    isHomeTeam
      ? setHomePenalties((prev) => prev + 1)
      : setAwayPenalties((prev) => prev + 1);
  };

  const decreasePenalties = (isHomeTeam: boolean) => {
    isHomeTeam
      ? setHomePenalties((prev) => (prev <= 0 ? 0 : prev - 1))
      : setAwayPenalties((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  return (
    <div className="grid w-3/4 grid-cols-1 gap-4 md:grid-cols-2">
      <div className="card bg-neutral text-neutral-content">
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
                onClick={() => handleScoreDecrease("home")}
                disabled={state.scores.home <= 0}
              >
                -1
              </button>
              <p>{state.scores.home}</p>
              <button
                className="btn-accent btn"
                onClick={() => handleScoreIncrease("home")}
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
                onClick={() => handleScoreDecrease("away")}
                disabled={state.scores.away <= 0}
              >
                -1
              </button>
              <p>{state.scores.away}</p>
              <button
                className="btn-accent btn"
                onClick={() => handleScoreIncrease("away")}
              >
                +1
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-neutral text-neutral-content">
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
      <div className="card bg-neutral text-neutral-content">
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

      <div className="card bg-neutral text-neutral-content">
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

      <div className="card bg-neutral text-neutral-content">
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

      <div className="card bg-neutral text-neutral-content">
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

      <div className="card bg-neutral text-neutral-content">
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
            <TextArea text="Write a description of the match and a tweet will generate." />
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

      <div className="card bg-neutral text-neutral-content">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Final Score Graphic</h2>
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
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                {divisionId <= 2
                  ? "Penalties only for playoffs, ignore this toggle"
                  : isMatchWithPenalties
                  ? "Match went to penalties"
                  : "Match did not go to penalties"}
              </span>
              <input
                disabled={divisionId <= 2}
                type="checkbox"
                className="toggle-primary toggle"
                checked={isMatchWithPenalties}
                onChange={(event) => {
                  setIsMatchWithPenalties(!!event.target.checked);
                  setHomePenalties(0);
                  setAwayPenalties(0);
                }}
              />
            </label>
          </div>
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Penalties for {homeTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                disabled={!isMatchWithPenalties}
                className="btn-secondary btn"
                onClick={() => decreasePenalties(true)}
              >
                -1
              </button>
              <p>{homePenalties}</p>
              <button
                disabled={!isMatchWithPenalties}
                className="btn-accent btn"
                onClick={() => increasePenalties(true)}
              >
                +1
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Penalties for {awayTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                disabled={!isMatchWithPenalties}
                className="btn-secondary btn"
                onClick={() => decreasePenalties(false)}
              >
                -1
              </button>
              <p>{awayPenalties}</p>
              <button
                disabled={!isMatchWithPenalties}
                className="btn-accent btn"
                onClick={() => increasePenalties(false)}
              >
                +1
              </button>
            </div>
          </div>
          <div className="card-actions justify-end">
            <div className="form-control mx-auto w-full max-w-xs pt-10">
              <label className="label">
                <span className="label-text">
                  Upload the final score graphic
                </span>
              </label>
              <input
                type="file"
                className="file-input-bordered file-input-primary file-input w-full max-w-xs"
                onChange={(event) => {
                  if (isMatchWithPenalties && homeScore !== awayScore) {
                    dispatchToast({
                      type: "SET_ERROR",
                      message:
                        "Match can't go to penalties if regular score isn't identical.",
                    });
                  } else if (
                    isMatchWithPenalties &&
                    homePenalties === awayPenalties
                  ) {
                    dispatchToast({
                      type: "SET_ERROR",
                      message:
                        "Penalty values cannot be the same or else we can't determine a winner.",
                    });
                  } else if (event.target.files && event.target.files[0]) {
                    dispatchToast({
                      type: "SET_WARNING",
                      message: "Creating your final score graphic now...",
                    });
                    generateTwitterGraphic(event.target.files[0]).catch(
                      (error) => console.error(error)
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
          </div>
        </div>
      </div>
      {src.length > 0 && modalStatus ? (
        <TwitterGraphicModal
          base64={src}
          altText={altText}
          changeModalStatus={changeModalStatus}
        />
      ) : null}
    </div>
  );
};

export default TweetTemplate;
