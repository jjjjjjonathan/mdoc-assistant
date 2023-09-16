import { useReducer } from "react";

const initialState = {
  stadium: "",
  minute: "",
  scores: {
    home: 2,
    away: 2,
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
  type: "CHANGE_SCORE" | "DEFAULT";
  payload?: {
    scoreUpdate?: {
      team: "home" | "away";
      scoreChange: 1 | -1;
    };
  };
};

type Reducers = {
  CHANGE_SCORE: (state: State, action: ReducerActions) => State;
  DEFAULT: (state: State) => State;
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
