import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { api } from "~/utils/api";
import Roster from "~/components/Roster";
import { useState } from "react";
import classNames from "classnames";
import SingleMatch from "~/components/SingleMatch";
import TweetTemplate from "~/components/TweetTemplate";
import Loading from "~/components/Loading";

const MatchPage: NextPage = () => {
  const { id } = useRouter().query;
  const matchId = id ? (!Number.isNaN(+id) ? +id : 0) : undefined;
  const { data, isLoading } = api.matches.getUniqueMatch.useQuery({
    matchId: matchId || 0,
  });
  const [tab, setTab] = useState(4);

  if (isLoading) return <Loading />;
  if (!data) return <p>something went wrong</p>;

  const finalScoreTabClasses = classNames("tab-bordered", "tab", {
    "tab-active": tab === 2,
  });

  const homeTeamTabClasses = classNames("tab-bordered", "tab", {
    "tab-active": tab === 1,
  });

  const awayTeamTabClasses = classNames("tab-bordered", "tab", {
    "tab-active": tab === 3,
  });

  const tweetTemplateTabClasses = classNames("tab-bordered", "tab", {
    "tab-active": tab === 4,
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
      <div className="container mx-auto flex h-[calc(100vh-65px)] flex-col items-center gap-y-8 px-2 lg:pt-16">
        <div className="tabs">
          <button className={tweetTemplateTabClasses} onClick={() => setTab(2)}>
            Tweets and Final Score
          </button>
          <button className={homeTeamTabClasses} onClick={() => setTab(1)}>
            Home XI
          </button>
          <button className={awayTeamTabClasses} onClick={() => setTab(3)}>
            Away XI
          </button>
        </div>

        {tab === 1 && (
          <>
            <h1 className="text-center text-4xl font-bold">
              Lineup selection for {data.homeTeam.name}
            </h1>
            <Roster
              rosterUrl={data.homeTeam.rosterUrl}
              teamId={data.homeTeamId}
              xiGraphic={data.homeTeam.xiGraphic}
              hex={data.homeTeam.hex}
              teamName={data.homeTeam.name}
              coachHex={data.homeTeam.coachHex}
            />
          </>
        )}
        {tab === 3 && (
          <>
            <h1 className="text-center text-4xl font-bold">
              Lineup selection for {data.awayTeam.name}
            </h1>
            <Roster
              rosterUrl={data.awayTeam.rosterUrl}
              teamId={data.awayTeamId}
              xiGraphic={data.awayTeam.xiGraphic}
              hex={data.awayTeam.hex}
              teamName={data.awayTeam.name}
              coachHex={data.awayTeam.coachHex}
            />
          </>
        )}
        {tab === 2 && (
          <>
            <h1 className="text-center text-4xl font-bold">
              {data.homeTeam.name} vs. {data.awayTeam.name}
            </h1>
            <TweetTemplate
              homeTeamTwitter={data.homeTeam.twitterHandle}
              awayTeamTwitter={data.awayTeam.twitterHandle}
              division={data.division.name}
              divisionId={data.division.id}
              homeTeamName={data.homeTeam.name}
              awayTeamName={data.awayTeam.name}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MatchPage;
