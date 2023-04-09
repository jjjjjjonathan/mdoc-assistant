import type { NextPage } from "next";
import { api } from "~/utils/api";
import { useState } from "react";

type Team = {
  id: number;
  name: string;
};

const CreateMatchPage: NextPage = () => {
  const { data, isLoading } = api.divisions.getFormDivisionAndTeams.useQuery();

  const [division, setDivision] = useState(0);
  const [teamsList, setTeamsList] = useState<Team[] | undefined>([]);
  const [homeTeamId, setHomeTeamId] = useState(0);
  const [awayTeamId, setAwayTeamId] = useState(0);

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>SOMETHING WENT WRONG</p>;

  return (
    <form action="">
      <select
        className="select-bordered select w-full max-w-xs"
        onChange={(event) => {
          const divId = parseInt(event.target.value, 10);
          setDivision(divId);
          setTeamsList(data[divId - 1]?.teams);
          setHomeTeamId(0);
          setAwayTeamId(0);
        }}
        defaultValue={0}
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
        }}
        disabled={division < 1}
        defaultValue={0}
      >
        <option disabled value={0}>
          Pick a home team.
        </option>
        {data[division - 1]?.teams.map((team) => (
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
        defaultValue={0}
      >
        <option disabled value={0}>
          Pick an away team.
        </option>
        {data[division - 1]?.teams
          .filter((team) => team.id !== homeTeamId)
          .map((team) => (
            <option value={team.id} key={team.id}>
              {team.name}
            </option>
          ))}
      </select>
    </form>
  );
};

export default CreateMatchPage;
