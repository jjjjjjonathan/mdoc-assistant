import type { NextPage } from "next";
import { api } from "~/utils/api";
import Head from "next/head";
import MatchListItem from "~/components/MatchListItem";
import Loading from "~/components/Loading";

const MatchList: NextPage = () => {
  const ctx = api.useContext();

  const { data: matchData, isLoading: isLoadingUserMatches } =
    api.matches.getUserMatches.useQuery();

  const { mutate: updateMatch, isLoading: isUpdatingMatch } =
    api.matches.createOrUpdateNewMatch.useMutation({
      onSuccess: () => {
        void ctx.matches.getUserMatches.invalidate();
      },
    });

  const { data: divisionsTeamsData } =
    api.divisions.getFormDivisionAndTeams.useQuery();

  const updateCreatedMatch = (
    matchId: number,
    division: number,
    homeTeamId: number,
    awayTeamId: number,
    e2eNumber: number,
    scheduledTime: string,
    isNeutral: boolean,
    isForChampionship: boolean
  ) => {
    updateMatch({
      matchId,
      division,
      homeTeamId,
      awayTeamId,
      e2eNumber,
      scheduledTime,
      isNeutral,
      isForChampionship,
    });
  };

  const { mutate: deleteMatch, isLoading: isDeletingMatch } =
    api.matches.deleteCreatedMatch.useMutation({
      onSuccess: () => {
        void ctx.matches.getUserMatches.invalidate();
      },
    });

  const deleteCreatedMatch = (id: number) => {
    deleteMatch({ id });
  };

  if (isLoadingUserMatches)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  if (!matchData) return <p>something went wrong</p>;

  return (
    <>
      <Head>
        <title>Matches | League1 Ontario</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto my-10">
        <div className="grid grid-cols-1 gap-x-40 gap-y-10 p-1 lg:grid-cols-2 xl:grid-cols-3">
          {matchData.map((match) => (
            <MatchListItem
              key={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              scheduledTime={match.scheduledTime}
              division={match.division}
              id={match.id}
              onDeleteMatch={deleteCreatedMatch}
              e2eNumber={match.e2eNumber}
              onEditMatch={updateCreatedMatch}
              divisionsAndTeams={divisionsTeamsData}
              isNeutral={match.isNeutral}
              isForChampionship={match.isForChampionship}
            />
          ))}
        </div>
      </div>
      <div />
    </>
  );
};

export default MatchList;
