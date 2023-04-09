import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

type UpcomingMatchProps = {
  homeTeam: string;
  division: string;
  awayTeam: string;
  id: number;
  scheduledTime: Date;
};

const UpcomingMatch = ({
  homeTeam,
  division,
  awayTeam,
  id,
  scheduledTime,
}: UpcomingMatchProps) => {
  return (
    <>
      <div className="divider" />
      <p>{homeTeam}</p>
      <p>{awayTeam}</p>
      <p>{division}</p>
      <p>{id.toString(10)}</p>
      <p>{scheduledTime.toISOString()}</p>
    </>
  );
};

const Welcome = () => {
  const ctx = api.useContext();
  const { data, isLoading } = api.matches.getUpcomingUserMatches.useQuery();
  const { user, isSignedIn } = useUser();

  const { mutate, isLoading: isCreatingNewMatch } =
    api.matches.createNewMatch.useMutation({
      onSuccess: () => {
        void ctx.matches.getUpcomingUserMatches.invalidate();
      },
    });

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
                <UpcomingMatch
                  key={match.id}
                  homeTeam={match.homeTeam.name}
                  awayTeam={match.awayTeam.name}
                  division={match.division.name}
                  id={match.id}
                  scheduledTime={match.scheduledTime}
                />
              ))}
              <div className="divider" />
              <div className="card-actions flex-nowrap">
                <button className="btn-primary btn w-1/2 shrink text-primary-content">
                  View your matches
                </button>
                <button
                  className="btn-secondary btn w-1/2 shrink text-secondary-content"
                  onClick={() => mutate()}
                >
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