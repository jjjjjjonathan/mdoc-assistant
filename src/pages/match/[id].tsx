import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { api } from "~/utils/api";
import Roster from "~/components/Roster";
import { useState } from "react";
import classNames from "classnames";

const MatchPage: NextPage = () => {
  const { id } = useRouter().query;
  const matchId = id ? (!Number.isNaN(+id) ? +id : 0) : undefined;
  const { data, isLoading } = api.matches.getUniqueMatch.useQuery({
    matchId: matchId || 0,
  });
  const [tab, setTab] = useState(2);

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>something went wrong</p>;

  const mainTabClasses = classNames("tab-bordered", "tab", {
    "tab-active": tab === 2,
  });

  const homeTeamTabClasses = classNames("tab-bordered", "tab", {
    "tab-active": tab === 1,
  });

  const awayTeamTabClasses = classNames("tab-bordered", "tab", {
    "tab-active": tab === 3,
  });

  return (
    <>
      <Head>
        <title>
          {data.homeTeam.name} vs. {data.awayTeam.name}
        </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold">
        {data.homeTeam.name} vs. {data.awayTeam.name}
      </h1>
      <div className="tabs">
        <button className={homeTeamTabClasses} onClick={() => setTab(1)}>
          Home XI
        </button>
        <button className={mainTabClasses} onClick={() => setTab(2)}>
          Main
        </button>
        <button className={awayTeamTabClasses} onClick={() => setTab(3)}>
          Away XI
        </button>
      </div>
      <p>
        score is:{" "}
        {data.goals.filter((goal) => goal.teamId === data.homeTeamId).length} -{" "}
        {data.goals.filter((goal) => goal.teamId === data.awayTeamId).length}
      </p>
      {tab === 1 && (
        <Roster
          rosterUrl={data.homeTeam.rosterUrl}
          teamId={data.homeTeamId}
          xiGraphic={data.homeTeam.xiGraphic}
          hex={data.homeTeam.hex}
          teamName={data.homeTeam.name}
          coachHex={data.homeTeam.coachHex}
        />
      )}
      {tab === 3 && (
        <Roster
          rosterUrl={data.awayTeam.rosterUrl}
          teamId={data.awayTeamId}
          xiGraphic={data.awayTeam.xiGraphic}
          hex={data.awayTeam.hex}
          teamName={data.awayTeam.name}
          coachHex={data.awayTeam.coachHex}
        />
      )}
      {tab === 2 && <p> hello</p>}
    </>
  );
};

export default MatchPage;
