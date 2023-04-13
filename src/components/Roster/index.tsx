import { api } from "~/utils/api";
import { useState } from "react";
import type { RosterPlayerType } from "~/server/api/routers/players";
import RosterPlayer from "./RosterPlayer";
import classNames from "classnames";
import TwitterGraphicModal from "../Modal/TwitterGraphic";
import Loading from "../Loading";

type RosterProps = {
  rosterUrl: string;
  teamId: number;
  xiGraphic: string;
  hex: string;
  teamName: string;
  coachHex: string;
};

const Roster = ({
  rosterUrl,
  teamId,
  xiGraphic,
  hex,
  teamName,
  coachHex,
}: RosterProps) => {
  const { data, isLoading } = api.players.getTeamRoster.useQuery({ rosterUrl });

  const [base64, setBase64] = useState("");
  const [altText, setAltText] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const changeModalStatus = (checked: boolean) => {
    setModalStatus(checked);
  };

  const { mutate: createTeamXI } = api.players.createTeamXI.useMutation({
    onSuccess: ({ base64, altText: lineupAltText }) => {
      setBase64(base64);
      setAltText(lineupAltText);
      setModalStatus(true);
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

    const sortedXI = mappedXI.sort((a, b) => {
      if (a.isGoalkeeper) return -1;
      if (b.isGoalkeeper) return 1;
      return a.number - b.number;
    });

    createTeamXI({
      startingXI: sortedXI,
      headCoach: headCoachName,
      teamId,
      xiGraphic,
      hex,
      teamName,
      coachHex,
    });
  };

  if (isLoading) return <Loading />;
  if (!data) return <p>something went wrong</p>;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="py-4"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.map((player) => (
          <RosterPlayer
            key={player.id}
            id={player.id}
            name={player.name}
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
          className={classNames("card w-full bg-neutral", {
            hidden: startingXI.length < 11,
          })}
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
      {base64.length > 0 && modalStatus && (
        <TwitterGraphicModal
          changeModalStatus={changeModalStatus}
          base64={base64}
          altText={altText}
        />
      )}
    </form>
  );
};

export default Roster;
