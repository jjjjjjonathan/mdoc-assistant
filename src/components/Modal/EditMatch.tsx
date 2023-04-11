import { useState } from "react";
import { formatISO9075 } from "date-fns";

type EditMatchModalProps = {
  matchId: number;
  divisionId: number;
  homeTeamId: number;
  awayTeamId: number;
  e2e: string;
  scheduledTimeDate: Date;
  onEditMatch: (
    matchId: number,
    division: number,
    homeTeamId: number,
    awayTeamId: number,
    e2eNumber: number,
    scheduledTime: string
  ) => void;
  divisionsAndTeams:
    | {
        teams: {
          id: number;
          name: string;
        }[];
        id: number;
        name: string;
      }[]
    | undefined;
};

type Team = {
  id: number;
  name: string;
};

const EditMatchModal = ({
  matchId,
  divisionId,
  homeTeamId,
  awayTeamId,
  e2e,
  scheduledTimeDate,
  onEditMatch,
  divisionsAndTeams,
}: EditMatchModalProps) => {
  const [division, setDivision] = useState(divisionId);
  const [teamsList, setTeamsList] = useState<Team[] | undefined>(
    divisionsAndTeams?.find((div) => div.id === division)?.teams
  );
  const [homeTeam, setHomeTeam] = useState(homeTeamId);
  const [awayTeam, setAwayTeam] = useState(awayTeamId);
  const [e2eNumber, setE2eNumber] = useState(e2e);
  const [scheduledTime, setScheduledTime] = useState(
    scheduledTimeDate.toISOString()
  );

  return (
    <>
      <input
        type="checkbox"
        id={`edit-modal-${matchId}`}
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-neutral-focus">
          <h3 className="text-lg font-bold">Edit match details</h3>
          <form action="" className="mt-4 flex flex-col items-center gap-y-2">
            <select
              className="select-bordered select w-full max-w-xs"
              onChange={(event) => {
                const divId = parseInt(event.target.value, 10);
                setDivision(divId);
                setTeamsList(
                  divisionsAndTeams?.find((division) => division.id === divId)
                    ?.teams
                );
                setHomeTeam(0);
                setAwayTeam(0);
              }}
              value={division}
            >
              <option disabled value={0}>
                Pick a division.
              </option>
              {teamsList?.map((division) => (
                <option value={division.id} key={division.id}>
                  {division.name}
                </option>
              ))}
            </select>
            <select
              className="select-bordered select w-full max-w-xs"
              onChange={(event) => {
                setHomeTeam(parseInt(event.target.value, 10));
                setAwayTeam(0);
              }}
              disabled={division < 1}
              value={homeTeam}
            >
              <option disabled value={0}>
                Pick a home team.
              </option>
              {teamsList?.map((team) => (
                <option value={team.id} key={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            <select
              className="select-bordered select w-full max-w-xs"
              onChange={(event) => {
                setAwayTeam(parseInt(event.target.value, 10));
              }}
              disabled={division < 1 || homeTeamId < 1}
              value={awayTeam}
            >
              <option disabled value={0}>
                Pick an away team.
              </option>
              {teamsList
                ?.filter((team) => team.id !== homeTeamId)
                .map((team) => (
                  <option value={team.id} key={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
            <input
              type="number"
              placeholder="Type E2E ID here"
              className="input-bordered input w-full max-w-xs"
              value={e2eNumber}
              onChange={(event) => setE2eNumber(event.target.value)}
            />
            <input
              type="datetime-local"
              className="input-bordered input w-full max-w-xs"
              onChange={(event) => {
                const date = new Date(event.target.value);
                setScheduledTime(date.toISOString());
              }}
              value={formatISO9075(new Date(scheduledTime))}
            />
          </form>
          <div className="modal-action">
            <label
              htmlFor={`edit-modal-${matchId}`}
              className="btn-success btn text-success-content hover:bg-success-content hover:text-success"
              onClick={() =>
                onEditMatch(
                  matchId,
                  division,
                  homeTeam,
                  awayTeam,
                  parseInt(e2eNumber, 10),
                  scheduledTime
                )
              }
            >
              Update match details
            </label>
            <label
              htmlFor={`edit-modal-${matchId}`}
              className="btn-warning btn text-warning-content hover:bg-warning-content hover:text-warning"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMatchModal;
