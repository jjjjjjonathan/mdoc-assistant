import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

const UpcomingMatch = ({ homeTeam }: { homeTeam: string }) => {
  return (
    <>
      <div className="divider" />
      <p>{homeTeam}</p>
    </>
  );
};

const Welcome = () => {
  const { data, isLoading } = api.matches.getUpcomingUserMatches.useQuery();
  const { user, isSignedIn } = useUser();

  if (isLoading) return <p>LOADING</p>;
  if (!data) return <p>something went wrong</p>;

  return (
    <>
      <div className="hero flex flex-col items-center justify-center bg-base-100">
        <div className="hero-content flex-col lg:flex-row lg:gap-x-24">
          <header className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Hi{isSignedIn && <span>, {user.firstName}</span>}!
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </header>
          <div className="card w-full max-w-sm flex-shrink-0 bg-neutral shadow-2xl">
            <div className="card-body">
              <h2 className="card-title">
                {data.length === 0 && "You have no upcoming matches."}
                {data.length > 0 && "Here are your upcoming matches."}
              </h2>
              {data.map((match) => (
                <UpcomingMatch homeTeam={match.homeTeam.name} key={match.id} />
              ))}
              <div className="divider" />
              <div className="card-actions flex-nowrap">
                <button className="btn-primary btn w-1/2 shrink text-primary-content">
                  View your matches
                </button>
                <button className="btn-secondary btn w-1/2 shrink text-secondary-content">
                  Create a new match
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
