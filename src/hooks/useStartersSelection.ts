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

type State = RosterPlayerType[];

const useStartersSelection = () => {
  const reducers = {
    ADD_STARTER(state: State, action: ReducerActions) {
      return [...state, action.payload];
    },

    REMOVE_STARTER(state: State, action: ReducerActions) {
      return state.filter((player) => player.id !== action.payload.id);
    },

    SET_GOALKEEPER(state: State, action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, isGoalkeeper: true }
          : { ...player, isGoalkeeper: false }
      );
    },

    SET_CAPTAIN(state: State, action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, isCaptain: true }
          : { ...player, isCaptain: false }
      );
    },

    CHANGE_NUMBER(state: State, action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, number: action.payload.number }
          : player
      );
    },

    CHANGE_NAME(state: State, action: ReducerActions) {
      return state.map((player) =>
        player.id === action.payload.id
          ? { ...player, name: action.payload.name }
          : player
      );
    },
  };

  const reducer = (state: State, action: ReducerActions) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, []);

  const actions = {
    addToStartingLineup(player: RosterPlayerType) {
      dispatch({ type: "ADD_STARTER", payload: player });
    },
    removeFromStartingLineup(playerId: number) {
      const playerToRemove = state.find((player) => player.id === playerId);
      if (playerToRemove) {
        dispatch({ type: "REMOVE_STARTER", payload: playerToRemove });
      }
    },
    setGoalkeeper(playerId: number) {
      const goalkeeper = state.find((player) => player.id === playerId);
      if (goalkeeper) {
        dispatch({ type: "SET_GOALKEEPER", payload: { ...goalkeeper } });
      }
    },
    setCaptain(playerId: number) {
      const captain = state.find((player) => player.id === playerId);
      if (captain) {
        dispatch({ type: "SET_CAPTAIN", payload: captain });
      }
    },
    updateNumber(playerId: number, shirtNumber: number) {
      const playerToUpdate = state.find((player) => player.id === playerId);
      if (playerToUpdate) {
        dispatch({
          type: "CHANGE_NUMBER",
          payload: { ...playerToUpdate, number: shirtNumber },
        });
      }
    },
    updateName(playerId: number, playerName: string) {
      const playerToUpdate = state.find((player) => player.id === playerId);
      if (playerToUpdate) {
        dispatch({
          type: "CHANGE_NAME",
          payload: { ...playerToUpdate, name: playerName },
        });
      }
    },
  };

  return { startingXI: state, dispatch, actions };
};

export default useStartersSelection;
