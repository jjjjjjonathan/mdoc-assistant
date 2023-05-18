import { useReducer } from "react";
import type { RosterPlayerType } from "~/server/api/routers/players";

type ReducerActions = {
  type:
    | "ADD_STARTER"
    | "REMOVE_STARTER"
    | "SET_GOALKEEPER"
    | "SET_CAPTAIN"
    | "CHANGE_NUMBER"
    | "CHANGE_NAME";
  payload: RosterPlayerType;
};

const useStartersSelection = () => {
  const reducers = {
    ADD_STARTER(state: RosterPlayerType[], action: ReducerActions) {
      return [...state, action.payload];
    },

    REMOVE_STARTER(state: RosterPlayerType[], action: ReducerActions) {
      return state.filter((player) => player.id !== action.payload.id);
    },

    SET_GOALKEEPER(state: RosterPlayerType[], action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, isGoalkeeper: true }
          : { ...player, isGoalkeeper: false }
      );
    },

    SET_CAPTAIN(state: RosterPlayerType[], action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, isCaptain: true }
          : { ...player, isCaptain: false }
      );
    },

    CHANGE_NUMBER(state: RosterPlayerType[], action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, number: action.payload.number }
          : player
      );
    },

    CHANGE_NAME(state: RosterPlayerType[], action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, name: action.payload.name }
          : player
      );
    },
  };

  const reducer = (state: RosterPlayerType[], action: ReducerActions) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, []);

  return { startingXI: state, dispatch };
};

export default useStartersSelection;
