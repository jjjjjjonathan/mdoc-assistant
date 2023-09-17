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
  type: "CHANGE_SCORE" | "DEFAULT" | "CHANGE_MINUTE" | "CHANGE_STADIUM";
  payload?: {
    scoreUpdate?: {
      team: "home" | "away";
      scoreChange: 1 | -1;
    };
    newMinute?: string;
    newStadium?: string;
  };
};

const useMatchState = () => {
  const reducers = {
    CHANGE_SCORE(state: State, action: ReducerActions) {
      if (action.payload && action.payload.scoreUpdate) {
        return {
          ...state,
          scores: {
            ...state.scores,
            [action.payload?.scoreUpdate?.team]:
              state.scores[action.payload?.scoreUpdate?.team] +
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
    DEFAULT(state: State) {
      return state;
    },
  };
  const reducer = (state: State, action: ReducerActions): State => {
    return reducers[action.type](state, action);
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useMatchState;
