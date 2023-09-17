import { useReducer } from "react";

const initialState = {
  stadium: "",
  minute: "",
  goalMinute: "",
  redCardMinute: "",
  scores: {
    home: 0,
    away: 0,
  },
  penalties: {
    home: 0,
    away: 0,
  },
  tweetContent: {
    preMatch: "",
    kickoff: "",
    midMatch: "",
    goal: "",
    redCard: "",
    halfOrFullTime: "",
  },
};

type State = typeof initialState;

type ReducerActions = {
  type:
    | "CHANGE_SCORE"
    | "DEFAULT"
    | "CHANGE_MINUTE"
    | "CHANGE_STADIUM"
    | "CHANGE_TWEET_CONTENT"
    | "CHANGE_PENALTIES"
    | "RESET_PENALTIES";
  payload?: {
    scoreUpdate?: {
      team: "home" | "away";
      scoreChange: 1 | -1;
    };
    penaltiesUpdate?: {
      team: "home" | "away";
      penaltiesChange: 1 | -1;
    };
    newMinute?: string;
    newStadium?: string;
    tweetContentUpdate?: {
      type:
        | "preMatch"
        | "kickoff"
        | "midMatch"
        | "goal"
        | "redCard"
        | "halfOrFullTime";
      content: string;
    };
  };
};

const useMatchState = () => {
  const reducers = {
    DEFAULT(state: State) {
      return state;
    },
    CHANGE_SCORE(state: State, action: ReducerActions) {
      if (action.payload && action.payload.scoreUpdate) {
        return {
          ...state,
          scores: {
            ...state.scores,
            [action.payload.scoreUpdate.team]:
              state.scores[action.payload.scoreUpdate.team] +
              action.payload.scoreUpdate.scoreChange,
          },
        };
      }
      return state;
    },
    CHANGE_MINUTE(state: State, action: ReducerActions) {
      if (action.payload && action.payload.newMinute !== undefined) {
        return {
          ...state,
          minute:
            action.payload.newMinute.length !== 0
              ? action.payload.newMinute
              : "",
        };
      }
      return state;
    },
    CHANGE_STADIUM(state: State, action: ReducerActions) {
      if (action.payload && action.payload.newStadium !== undefined) {
        return {
          ...state,
          stadium: action.payload.newStadium,
        };
      }
      return state;
    },
    CHANGE_TWEET_CONTENT(state: State, action: ReducerActions) {
      if (action.payload && action.payload.tweetContentUpdate) {
        return {
          ...state,
          tweetContent: {
            ...state.tweetContent,
            [action.payload.tweetContentUpdate.type]:
              action.payload.tweetContentUpdate.content,
          },
        };
      }
      return state;
    },
    CHANGE_PENALTIES(state: State, action: ReducerActions) {
      if (action.payload && action.payload.penaltiesUpdate) {
        return {
          ...state,
          penalties: {
            ...state.penalties,
            [action.payload.penaltiesUpdate.team]:
              state.penalties[action.payload.penaltiesUpdate.team] +
              action.payload.penaltiesUpdate.penaltiesChange,
          },
        };
      }
      return state;
    },
    RESET_PENALTIES(state: State) {
      return {
        ...state,
        penalties: initialState.penalties,
      };
    },
  };
  const reducer = (state: State, action: ReducerActions): State => {
    return reducers[action.type || "DEFAULT"](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useMatchState;
