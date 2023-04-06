import { api } from "~/utils/api";

type MatchesListProps = {
  userId: string | undefined;
};

const MatchesList = ({ userId }: MatchesListProps) => {
  const { data, isLoading } = api.matches.getUserMatches.useQuery();

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>something went wrong</p>;

  return (
    <>
      <p>MATCHES LOADED for {userId}</p>
      <p>{data[0]?.homeTeam.name}</p>
    </>
  );
};

export default MatchesList;
