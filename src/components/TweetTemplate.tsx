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
import ScoreUpdater from "./ScoreUpdater";

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

type MinuteInputProps = {
  handleChange: (newMinute: string) => void;
  value: string;
  placeholder: string;
};

const MinuteInput = ({
  handleChange,
  value,
  placeholder,
}: MinuteInputProps) => {
  return (
    <input
      type="text"
      onChange={(event) => handleChange(event.target.value)}
      placeholder={placeholder}
      value={value}
      className="input-bordered input w-full"
    />
  );
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

  const { toastStatus, toastMessage, dispatchToast, clearToast } = useToast();

  const { mutate: generateGraphic } =
    api.matches.createFullTimeGraphic.useMutation({
      onSuccess: ({ base64, altText }) => {
        clearToast();
        dispatch({
          type: "SET_GRAPHIC_MODAL",
          payload: {
            graphicUpdate: {
              src: base64,
              altText,
            },
          },
        });
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
      homeScore: state.scores.home,
      awayScore: state.scores.away,
      base64: base64String,
      homeTeam: homeTeamName,
      awayTeam: awayTeamName,
      division,
      divisionId,
      homePenalties: state.penalties.home,
      awayPenalties: state.penalties.away,
      isMatchWithPenalties: state.statuses.isMatchWithPenalties,
    });
  };

  const preMatchTweet = generatePreMatchTweet(
    state.stadium,
    homeTeamTwitter,
    awayTeamTwitter,
    division,
    state.tweetContent.preMatch,
    hashtags,
    isNeutral,
    isForChampionship
  );

  const kickoffTweet = generateKickoffTweet(
    state.tweetContent.kickoff,
    homeTeamTwitter,
    awayTeamTwitter,
    hashtags
  );

  const matchTweet = generateMatchTweet(
    state.minute,
    homeTeamTwitter,
    awayTeamTwitter,
    state.scores.home,
    state.scores.away,
    state.tweetContent.midMatch,
    hashtags
  );

  const goalTweet = generateGoalTweet(
    state.tweetContent.goal,
    homeTeamTwitter,
    state.scores.home,
    awayTeamTwitter,
    state.scores.away,
    state.statuses.isHomeGoal,
    state.minute,
    hashtags
  );

  const redCardTweet = generateRedCardTweet(
    state.minute,
    state.tweetContent.redCard,
    homeTeamTwitter,
    state.scores.home,
    awayTeamTwitter,
    state.scores.away,
    state.statuses.isHomeRedCard,
    hashtags
  );

  const breakTweet = generateBreakTweet(
    state.stadium,
    homeTeamTwitter,
    state.scores.home,
    awayTeamTwitter,
    state.scores.away,
    state.tweetContent.halfOrFullTime,
    state.statuses.isFullTime,
    hashtags
  );

  const handleStadiumChange = (newStadium: string) => {
    dispatch({
      type: "CHANGE_STADIUM",
      payload: {
        newStadium,
      },
    });
  };

  const handlePreMatchTweet = (content: string) => {
    dispatch({
      type: "CHANGE_TWEET_CONTENT",
      payload: {
        tweetContentUpdate: {
          type: "preMatch",
          content,
        },
      },
    });
  };

  const handleMinuteChange = (newMinute: string) => {
    dispatch({
      type: "CHANGE_MINUTE",
      payload: {
        newMinute,
      },
    });
  };

  const handleMidMatchTweetChange = (content: string) => {
    dispatch({
      type: "CHANGE_TWEET_CONTENT",
      payload: {
        tweetContentUpdate: {
          type: "midMatch",
          content,
        },
      },
    });
  };

  const handleKickoffTweetChange = (content: string) => {
    dispatch({
      type: "CHANGE_TWEET_CONTENT",
      payload: {
        tweetContentUpdate: {
          type: "kickoff",
          content,
        },
      },
    });
  };

  const handleRedCardPlayerChange = (content: string) => {
    dispatch({
      type: "CHANGE_TWEET_CONTENT",
      payload: {
        tweetContentUpdate: {
          type: "redCard",
          content,
        },
      },
    });
  };

  const handleGoalTweetChange = (content: string) => {
    dispatch({
      type: "CHANGE_TWEET_CONTENT",
      payload: {
        tweetContentUpdate: {
          type: "goal",
          content,
        },
      },
    });
  };

  const handleBreakTweetChange = (content: string) => {
    dispatch({
      type: "CHANGE_TWEET_CONTENT",
      payload: {
        tweetContentUpdate: {
          type: "halfOrFullTime",
          content,
        },
      },
    });
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

  const handlePenaltiesDecrease = (team: "home" | "away") => {
    if (state.penalties[team] > 0) {
      dispatch({
        type: "CHANGE_PENALTIES",
        payload: {
          penaltiesUpdate: {
            team,
            penaltiesChange: -1,
          },
        },
      });
    }
  };

  const handlePenaltiesIncrease = (team: "home" | "away") => {
    dispatch({
      type: "CHANGE_PENALTIES",
      payload: {
        penaltiesUpdate: {
          team,
          penaltiesChange: 1,
        },
      },
    });
  };

  const resetPenalties = () => {
    dispatch({ type: "RESET_PENALTIES" });
  };

  const handleGoalStatusChange = (statusValue: boolean) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        statusUpdates: {
          type: "isHomeGoal",
          statusValue,
        },
      },
    });
  };

  const handleRedCardStatusChange = (statusValue: boolean) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        statusUpdates: {
          type: "isHomeRedCard",
          statusValue,
        },
      },
    });
  };

  const handleBreakChange = (statusValue: boolean) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        statusUpdates: {
          type: "isFullTime",
          statusValue,
        },
      },
    });
  };

  const handleMatchWithPenaltiesChange = (statusValue: boolean) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        statusUpdates: {
          type: "isMatchWithPenalties",
          statusValue,
        },
      },
    });
  };

  const handleModalStatusChange = (statusValue: boolean) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        statusUpdates: {
          type: "isModalOpen",
          statusValue,
        },
      },
    });
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
            value={state.stadium}
            onChange={(event) => handleStadiumChange(event.target.value)}
          />
          <ScoreUpdater
            homeTeamName={homeTeamName}
            awayTeamName={awayTeamName}
            homeScore={state.scores.home}
            awayScore={state.scores.away}
            handleScoreDecrease={handleScoreDecrease}
            handleScoreIncrease={handleScoreIncrease}
          />
        </div>
      </div>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Pre-match tweet</h2>
          <textarea
            className="textarea-bordered textarea"
            placeholder="Add optional context to the pre-match tweet"
            onChange={(event) => handlePreMatchTweet(event.target.value)}
          ></textarea>
          {state.stadium.length <= 0 ? (
            <TextArea text="Write the name of the field and a pre-match tweet will generate." />
          ) : (
            <TextArea text={preMatchTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={preMatchTweet}
              textType="pre-match tweet"
              disabled={state.stadium.length <= 0}
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
          {state.tweetContent.kickoff.length <= 0 ? (
            <TextArea text="Write something for kickoff and a tweet will generate." />
          ) : (
            <TextArea text={kickoffTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={kickoffTweet}
              textType="kickoff tweet"
              disabled={state.tweetContent.kickoff.length <= 0}
            />
          </div>
        </div>
      </div>

      <div className="card bg-neutral text-neutral-content">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Mid-match update</h2>
          <MinuteInput
            value={state.minute}
            placeholder={"Current minute of the match"}
            handleChange={handleMinuteChange}
          />
          <textarea
            className="textarea-bordered textarea"
            placeholder="What happened in the match?"
            onChange={(event) => handleMidMatchTweetChange(event.target.value)}
          ></textarea>
          {state.tweetContent.midMatch.length <= 0 ||
          state.minute.length <= 0 ? (
            <TextArea text="Put down the minute and write a description of what happened in the match, and a tweet will generate." />
          ) : (
            <TextArea text={matchTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={matchTweet}
              textType="match tweet"
              disabled={
                state.tweetContent.midMatch.length <= 0 ||
                state.minute.length <= 0
              }
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
                Goal for{" "}
                {state.statuses.isHomeGoal ? homeTeamName : awayTeamName}
              </span>
              <input
                type="checkbox"
                className="toggle-primary toggle"
                checked={state.statuses.isHomeGoal}
                onChange={(event) =>
                  handleGoalStatusChange(!!event.target.checked)
                }
              />
            </label>
          </div>
          <MinuteInput
            value={state.minute}
            placeholder={"Minute for goal"}
            handleChange={handleMinuteChange}
          />
          <textarea
            className="textarea-bordered textarea"
            placeholder="Describe the goal."
            onChange={(event) => handleGoalTweetChange(event.target.value)}
          ></textarea>

          {state.tweetContent.goal.length <= 0 || state.minute.length <= 0 ? (
            <TextArea text="Write the minute and description of a goal, and a tweet will generate." />
          ) : (
            <TextArea text={goalTweet} />
          )}

          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={goalTweet}
              textType="goal tweet"
              disabled={
                state.tweetContent.goal.length <= 0 || state.minute.length <= 0
              }
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
                Red Card for{" "}
                {state.statuses.isHomeRedCard ? homeTeamName : awayTeamName}
              </span>
              <input
                type="checkbox"
                className="toggle-primary toggle"
                checked={state.statuses.isHomeRedCard}
                onChange={(event) =>
                  handleRedCardStatusChange(!!event.target.checked)
                }
              />
            </label>
          </div>
          <MinuteInput
            value={state.minute}
            placeholder={"Minute for red card"}
            handleChange={handleMinuteChange}
          />
          <TextInput
            handleChange={handleRedCardPlayerChange}
            placeholder={`Player for red card`}
            initialValue={""}
          />

          {state.tweetContent.redCard.length <= 0 ||
          state.minute.length <= 0 ? (
            <TextArea text="Write the minute and player name for a red card, and a tweet will generate." />
          ) : (
            <TextArea text={redCardTweet} />
          )}

          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={redCardTweet}
              textType="red card tweet"
              disabled={
                state.tweetContent.redCard.length <= 0 ||
                state.minute.length <= 0
              }
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
                Tweet is for{" "}
                {state.statuses.isFullTime ? "full-time" : "half-time"}
              </span>
              <input
                type="checkbox"
                className="toggle-primary toggle"
                checked={state.statuses.isFullTime}
                onChange={(event) => handleBreakChange(!!event.target.checked)}
              />
            </label>
          </div>
          <ScoreUpdater
            homeTeamName={homeTeamName}
            awayTeamName={awayTeamName}
            homeScore={state.scores.home}
            awayScore={state.scores.away}
            handleScoreDecrease={handleScoreDecrease}
            handleScoreIncrease={handleScoreIncrease}
          />
          <input
            type="text"
            placeholder="Write the name of the field."
            className="input-bordered input w-full"
            value={state.stadium}
            onChange={(event) => handleStadiumChange(event.target.value)}
          />
          <textarea
            className="textarea-bordered textarea"
            placeholder="Describe the events of the half."
            onChange={(event) => handleBreakTweetChange(event.target.value)}
          ></textarea>
          {state.stadium.length <= 0 ||
          state.tweetContent.halfOrFullTime.length <= 0 ? (
            <TextArea text="Write a description of the match and a tweet will generate." />
          ) : (
            <TextArea text={breakTweet} />
          )}
          <div className="card-actions justify-end">
            <ClipboardCopyButton
              textToCopy={breakTweet}
              textType="break tweet"
              disabled={
                state.stadium.length <= 0 ||
                state.tweetContent.halfOrFullTime.length <= 0
              }
            />
          </div>
        </div>
      </div>

      <div className="card bg-neutral text-neutral-content">
        <div className="card-body gap-y-4">
          <h2 className="card-title">Final Score Graphic</h2>
          <ScoreUpdater
            homeTeamName={homeTeamName}
            awayTeamName={awayTeamName}
            homeScore={state.scores.home}
            awayScore={state.scores.away}
            handleScoreDecrease={handleScoreDecrease}
            handleScoreIncrease={handleScoreIncrease}
          />
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                {divisionId <= 2
                  ? "Penalties only for playoffs, ignore this toggle"
                  : state.statuses.isMatchWithPenalties
                  ? "Match went to penalties"
                  : "Match did not go to penalties"}
              </span>
              <input
                disabled={divisionId <= 2}
                type="checkbox"
                className="toggle-primary toggle"
                checked={state.statuses.isMatchWithPenalties}
                onChange={(event) => {
                  handleMatchWithPenaltiesChange(!!event.target.checked);
                  resetPenalties();
                }}
              />
            </label>
          </div>
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Penalties for {homeTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                disabled={
                  !state.statuses.isMatchWithPenalties ||
                  state.penalties.home <= 0
                }
                className="btn-secondary btn"
                onClick={() => handlePenaltiesDecrease("home")}
              >
                -1
              </button>
              <p>{state.penalties.home}</p>
              <button
                disabled={!state.statuses.isMatchWithPenalties}
                className="btn-accent btn"
                onClick={() => handlePenaltiesIncrease("home")}
              >
                +1
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
            <p>Penalties for {awayTeamName}:</p>
            <div className="flex flex-row items-center gap-x-4">
              <button
                disabled={
                  !state.statuses.isMatchWithPenalties ||
                  state.penalties.away <= 0
                }
                className="btn-secondary btn"
                onClick={() => handlePenaltiesDecrease("away")}
              >
                -1
              </button>
              <p>{state.penalties.away}</p>
              <button
                disabled={!state.statuses.isMatchWithPenalties}
                className="btn-accent btn"
                onClick={() => handlePenaltiesIncrease("away")}
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
                  if (
                    state.statuses.isMatchWithPenalties &&
                    state.scores.home !== state.scores.away
                  ) {
                    dispatchToast({
                      type: "SET_ERROR",
                      message:
                        "Match can't go to penalties if regular score isn't identical.",
                    });
                  } else if (
                    state.statuses.isMatchWithPenalties &&
                    state.penalties.home === state.penalties.away
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
      {state.modal.src.length > 0 && state.statuses.isModalOpen ? (
        <TwitterGraphicModal
          base64={state.modal.src}
          altText={state.modal.altText}
          changeModalStatus={handleModalStatusChange}
        />
      ) : null}
    </div>
  );
};

export default TweetTemplate;
