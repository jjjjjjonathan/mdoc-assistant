import { api } from "~/utils/api";
import { useState, useEffect } from "react";
import type { RosterPlayerType } from "~/server/api/routers/players";
import TwitterGraphicModal from "../Modal/TwitterGraphic";
import Loading from "../Loading";
import TextInput from "../Form/TextInput";
import useStartersSelection from "~/hooks/useStartersSelection";
import Toast from "../Toast";
import useToast from "~/hooks/useToast";
import {
  validatePlayerNumbers,
  validatePlayerNamesLength,
  validateOneOrLessGoalkeeper,
  validateOneOrLessCaptain,
} from "~/utils/helpers";
import Table from "../Table";

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

  const { startingXI, actions } = useStartersSelection();
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
    } else if (!validatePlayerNamesLength(startingXI)) {
      dispatchToast({
        type: "SET_ERROR",
        message: "Some players need to have names!",
      });
    } else if (!validateOneOrLessCaptain) {
      dispatchToast({
        type: "SET_ERROR",
        message: "Only select one captain or less!",
      });
    } else if (!validateOneOrLessGoalkeeper) {
      dispatchToast({
        type: "SET_ERROR",
        message: "Only select one goalkeeper or less!",
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

  const [playerSearch, setPlayerSearch] = useState("");
  const [roster, setRoster] = useState(data);

  useEffect(() => {
    if (startingXI.length === 11) {
      setRoster(
        data?.filter((player) =>
          startingXI.map((starter) => starter.id).includes(player.id)
        )
      );
      setPlayerSearch("");
    } else {
      setRoster(
        data?.filter((player) =>
          player.name.toLowerCase().includes(playerSearch.toLowerCase())
        )
      );
    }
  }, [playerSearch, data, startingXI]);

  if (isLoading) return <Loading />;
  if (!data) return <p>something went wrong</p>;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className="py-4"
    >
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
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
              initialValue=""
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
      </div> */}
      <TextInput
        initialValue={playerSearch}
        placeholder="Search for a player"
        handleChange={setPlayerSearch}
        disabled={startingXI.length === 11}
      />
      <Table data={roster} actions={actions} startingLineup={startingXI} />
      {startingXI.length === 11 ? (
        <>
          <TextInput
            handleChange={updateHeadCoach}
            placeholder="Type head coach's name"
            initialValue=""
          />
          <button
            onClick={() => {
              submitRoster(startingXI, headCoach, teamId, hex);
            }}
            className="btn-primary btn text-primary-content"
            disabled={!headCoach || startingXI.length < 11 || isLoadingGraphic}
          >
            Create XI
          </button>
        </>
      ) : null}
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
    </form>
  );
};

export default Roster;
