import { api } from "~/utils/api";
import { useState } from "react";
import type { RosterPlayerType } from "~/server/api/routers/players";
import RosterPlayer from "./RosterPlayer";
import classNames from "classnames";
import TwitterGraphicModal from "../Modal/TwitterGraphic";
import Loading from "../Loading";
import TextInput from "../Form/TextInput";
import useStartersSelection from "~/hooks/useStartersSelection";
import Toast from "../Toast";
import useToast from "~/hooks/useToast";
import { validatePlayerNumbers } from "~/utils/helpers";

import { createRosterColumns } from "./Columns";
import Table from "../Table";
import type { ColumnDef } from "@tanstack/react-table";
import Toggle from "../Form/Toggle";

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

  const { startingXI, dispatch } = useStartersSelection();
  const { toastStatus, toastMessage, dispatchToast, clearToast } = useToast();

  const [base64, setBase64] = useState("");
  const [altText, setAltText] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const changeModalStatus = (checked: boolean) => {
    setModalStatus(checked);
  };

  const { mutate: createTeamXI, isLoading: isLoadingGraphic } =
    api.players.createTeamXI.useMutation({
      onSuccess: ({ base64, altText: lineupAltText }) => {
        dispatchToast({ type: "CLEAR_TOAST", message: "" });
        setBase64(base64);
        setAltText(lineupAltText);
        setModalStatus(true);
      },
    });

  const addToStartingXI = (id: number) => {
    if (data) {
      dispatch({
        type: "ADD_STARTER",
        payload: data.find((player) => player.id === id) as RosterPlayerType,
      });
    }
  };
  const removeFromStartingXI = (id: number) => {
    dispatch({
      type: "REMOVE_STARTER",
      payload: startingXI.find(
        (player) => player.id === id
      ) as RosterPlayerType,
    });
  };

  const changePlayerName = (id: number, name: string) => {
    const playerToChange = startingXI.find((player) => player.id === id);

    if (playerToChange) {
      dispatch({
        type: "CHANGE_NAME",
        payload: { ...playerToChange, name },
      });
    }
  };

  const changePlayerNumber = (id: number, newNumber: number) => {
    const playerToChange = startingXI.find((player) => player.id === id);

    if (playerToChange) {
      dispatch({
        type: "CHANGE_NUMBER",
        payload: { ...playerToChange, number: newNumber },
      });
    }
  };

  const updateGoalkeeper = (id = -1) => {
    const newGoalkeeper = startingXI.find((player) => player.id === id);
    if (newGoalkeeper) {
      dispatch({
        type: "SET_GOALKEEPER",
        payload: newGoalkeeper,
      });
    }
  };

  const updateCaptain = (id = -1) => {
    const newCaptain = startingXI.find((player) => player.id === id);
    if (newCaptain) {
      dispatch({
        type: "SET_CAPTAIN",
        payload: newCaptain,
      });
    }
  };

  const [headCoach, setHeadCoach] = useState("");
  const updateHeadCoach = (name: string) => {
    setHeadCoach(name);
  };

  const submitRoster = (
    startingXI: RosterPlayerType[],
    headCoachName: string,
    teamId: number,
    hex: string
  ) => {
    dispatchToast({
      type: "SET_WARNING",
      message: "Creating your starting lineup graphic...",
    });

    if (!validatePlayerNumbers(startingXI)) {
      dispatchToast({
        type: "SET_ERROR",
        message: "Some players are missing shirt numbers!",
      });
    } else {
      const sortedXI = startingXI.sort((a, b) => {
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
    }
  };

  const columns = createRosterColumns(addToStartingXI, removeFromStartingXI);

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
          />
        ))}
        <div
          className={classNames("card w-full bg-neutral", {
            hidden: startingXI.length < 11,
          })}
        >
          <div className="card-body">
            <h2 className="card-title">READY TO SUBMIT</h2>
            <TextInput
              handleChange={updateHeadCoach}
              placeholder="Type head coach's name"
            />
            <button
              onClick={() => {
                submitRoster(startingXI, headCoach, teamId, hex);
              }}
              className="btn-primary btn text-primary-content"
              disabled={
                !headCoach || startingXI.length < 11 || isLoadingGraphic
              }
            >
              Create XI
            </button>
          </div>
        </div>
      </div>
      <Toast
        status={toastStatus}
        message={toastMessage}
        clearToast={clearToast}
      />
      {base64.length > 0 && modalStatus ? (
        <TwitterGraphicModal
          changeModalStatus={changeModalStatus}
          base64={base64}
          altText={altText}
        />
      ) : null}
      <Table columns={columns} data={data} />
    </form>
  );
};

export default Roster;
