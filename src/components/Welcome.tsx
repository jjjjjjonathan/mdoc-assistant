import { api } from "~/utils/api";

const Welcome = () => {

  const { data, isLoading } = api.matches.getUpcomingUserMatches.useQuery();

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>something went wrong</p>;

  return (
    <>
      <p>I should have pulled two matches in data. I have {data.length} and they are:</p>
      <ul>
        {data.map((match) => (
          <li key={match.id}>{match.homeTeam.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Welcome;