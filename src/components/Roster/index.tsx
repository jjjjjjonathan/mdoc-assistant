import { api } from "~/utils/api";
import { useState } from "react";
import type { RosterPlayerType } from "~/server/api/routers/players";
import RosterPlayer from "./RosterPlayer";

type RosterProps = {
  rosterUrl: string;
};

const Roster = ({ rosterUrl }: RosterProps) => {
  const { data, isLoading } = api.players.getTeamRoster.useQuery({ rosterUrl });

  const [startingXI, setStartingXI] = useState<RosterPlayerType[]>([]);
  const addToStartingXI = (startingXI: RosterPlayerType[], id: number) => {
    setStartingXI((prev) => {
      return [
        ...prev,
        data?.find((player) => player.id === id),
      ] as RosterPlayerType[];
    });
  };
  const removeFromStartingXI = (id: number) => {
    setStartingXI((prev) => {
      return prev.filter((player) => player.id !== id);
    });
  };

  const changePlayerName = (id: number, name: string) => {
    setStartingXI((prev) =>
      prev.map((player) => (player.id === id ? { ...player, name } : player))
    );
  };

  const changePlayerNumber = (id: number, newNumber: number) => {
    setStartingXI((prev) =>
      prev.map((player) =>
        player.id === id ? { ...player, number: newNumber } : player
      )
    );
  };

  const [goalkeeper, setGoalkeeper] = useState<number>(-1);
  const updateGoalkeeper = (id = -1) => {
    setGoalkeeper(id);
  };

  const [captain, setCaptain] = useState<number>(-1);
  const updateCaptain = (id = -1) => {
    setCaptain(id);
  };

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>something went wrong</p>;

  return (
    <form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((player) => (
          <RosterPlayer
            key={player.id}
            id={player.id}
            name={player.name}
            number={player.number}
            startingXI={startingXI}
            addToStartingXI={addToStartingXI}
            removeFromStartingXI={removeFromStartingXI}
            updateGoalkeeper={updateGoalkeeper}
            updateCaptain={updateCaptain}
            changePlayerName={changePlayerName}
            changePlayerNumber={changePlayerNumber}
            goalkeeper={goalkeeper}
          />
        ))}
      </div>
    </form>
  );
};

export default Roster;
