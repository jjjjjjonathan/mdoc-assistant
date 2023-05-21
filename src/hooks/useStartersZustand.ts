import { create } from "zustand";
import type { RosterPlayerType } from "~/server/api/routers/players";

type State = {
  startingLineup: RosterPlayerType[];
};

type Action = {
  addStarter: (player: RosterPlayerType) => void;
  removeStarter: (playerId: number) => void;
  updatePlayerName: (playerId: number, playerName: string) => void;
};

const useStartersZustand = () => {
  const useStartingLineupStore = create<State & Action>()((set) => ({
    startingLineup: [],
    addStarter: (player) =>
      set((state) => ({ startingLineup: [...state.startingLineup, player] })),
    removeStarter: (playerId) =>
      set((state) => ({
        startingLineup: state.startingLineup.filter(
          (player) => player.id !== playerId
        ),
      })),
    updatePlayerName: (playerId, playerName) =>
      set((state) => ({
        startingLineup: state.startingLineup.map((player) =>
          player.id === playerId ? { ...player, name: playerName } : player
        ),
      })),
  }));

  return useStartingLineupStore;
};

export default useStartersZustand;
