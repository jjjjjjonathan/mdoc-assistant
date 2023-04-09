import type { NextPage } from "next";
import { api } from "~/utils/api";
import { useState } from "react";

type Team = {
  id: number;
  name: string;
};

type NewMatchInput = {
  division: number;
  homeTeamId: number;
  awayTeamId: number;
  e2eNumber: number;
  scheduledTime: string;
};

const CreateMatchPage: NextPage = () => {
  const { data, isLoading } = api.divisions.getFormDivisionAndTeams.useQuery();

  const { mutate, isLoading: isCreatingNewMatch } =
    api.matches.createNewMatch.useMutation({
      onSuccess: () => {
        console.log("new match created!");
      },
    });

  const createNewMatch = ({
    division,
    homeTeamId,
    awayTeamId,
    e2eNumber,
    scheduledTime,
  }: NewMatchInput) => {
    mutate({ division, homeTeamId, awayTeamId, e2eNumber, scheduledTime });
  };

  const [division, setDivision] = useState(0);
  const [teamsList, setTeamsList] = useState<Team[] | undefined>([]);
  const [homeTeamId, setHomeTeamId] = useState(0);
  const [awayTeamId, setAwayTeamId] = useState(0);
  const [e2eNumber, setE2eNumber] = useState("0");
  const [scheduledTime, setScheduledTime] = useState("");

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>SOMETHING WENT WRONG</p>;

  return (
    <>
      <form action="">
        <select
          className="select-bordered select w-full max-w-xs"
          onChange={(event) => {
            const divId = parseInt(event.target.value, 10);
            setDivision(divId);
            setTeamsList(data.find((division) => division.id === divId)?.teams);
            setHomeTeamId(0);
            setAwayTeamId(0);
          }}
          value={division}
        >
          <option disabled value={0}>
            Pick a division.
          </option>
          {data.map((division) => (
            <option value={division.id} key={division.id}>
              {division.name}
            </option>
          ))}
        </select>
        <select
          className="select-bordered select w-full max-w-xs"
          onChange={(event) => {
            setHomeTeamId(parseInt(event.target.value, 10));
            setAwayTeamId(0);
          }}
          disabled={division < 1}
          value={homeTeamId}
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
            setAwayTeamId(parseInt(event.target.value, 10));
          }}
          disabled={division < 1 || homeTeamId < 1}
          value={awayTeamId}
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
        />
      </form>
      <button
        onClick={() =>
          createNewMatch({
            division,
            homeTeamId,
            awayTeamId,
            e2eNumber: parseInt(e2eNumber, 10),
            scheduledTime,
          })
        }
      >
        SUBMIT
      </button>
    </>
  );
};

export default CreateMatchPage;
