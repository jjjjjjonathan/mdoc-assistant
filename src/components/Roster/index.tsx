import { api } from "~/utils/api";
import { useState } from "react";
import type { RosterPlayerType } from "~/server/api/routers/players";
import RosterPlayer from "./RosterPlayer";
import classNames from "classnames";
import Image from "next/image";

type RosterProps = {
  rosterUrl: string;
  teamId: number;
  xiGraphic: string;
  hex: string;
};

const Roster = ({ rosterUrl, teamId, xiGraphic, hex }: RosterProps) => {
  const { data, isLoading } = api.players.getTeamRoster.useQuery({ rosterUrl });

  const [base64, setBase64] = useState("");

  const { mutate: createTeamXI } = api.players.createTeamXI.useMutation({
    onSuccess: (graphicData) => {
      setBase64(graphicData);
    },
  });

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

  const [headCoach, setHeadCoach] = useState("");
  const updateHeadCoach = (name: string) => {
    setHeadCoach(name);
  };

  const submitRoster = (
    startingXI: RosterPlayerType[],
    goalkeeperId: number,
    captainId: number,
    headCoachName: string,
    teamId: number,
    hex: string
  ) => {
    const mappedXI = startingXI.map((player) => {
      if (player.id === goalkeeperId) {
        player.isGoalkeeper = true;
      }
      if (player.id === captainId) {
        player.isCaptain = true;
      }
      return player;
    });

    createTeamXI({
      startingXI: mappedXI,
      headCoach: headCoachName,
      teamId,
      xiGraphic,
      hex,
    });
  };

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>something went wrong</p>;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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
            captain={captain}
          />
        ))}
        <div
          className={classNames(
            "card w-full bg-base-200 shadow-xl shadow-neutral-focus",
            { hidden: startingXI.length < 11 }
          )}
        >
          <div className="card-body">
            <h2 className="card-title">READY TO SUBMIT</h2>
            <input
              className="input-bordered input w-full max-w-xs"
              placeholder="Type head coach's name"
              type="text"
              name=""
              id=""
              value={headCoach}
              onChange={(event) => {
                updateHeadCoach(event.target.value);
              }}
            />
            <button
              onClick={() => {
                submitRoster(
                  startingXI,
                  goalkeeper,
                  captain,
                  headCoach,
                  teamId,
                  hex
                );
              }}
              className="btn-primary btn text-primary-content"
              disabled={
                !headCoach ||
                startingXI.length < 11 ||
                goalkeeper < 0 ||
                captain < 0
              }
            >
              Create XI
            </button>
          </div>
        </div>
      </div>
      {base64.length > 0 && (
        <Image src={base64} alt="test" width={400} height={400} />
      )}
    </form>
  );
};

export default Roster;
