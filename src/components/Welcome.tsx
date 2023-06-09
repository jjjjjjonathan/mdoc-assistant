import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { formatDistance, format } from "date-fns";
import Loading from "./Loading";

type UpcomingMatchProps = {
  homeTeam: string;
  division: string;
  awayTeam: string;
  id: number;
  scheduledTime: Date;
  homeLogo: string;
  awayLogo: string;
};

const UpcomingMatch = ({
  homeTeam,
  division,
  awayTeam,
  id,
  scheduledTime,
  homeLogo,
  awayLogo,
}: UpcomingMatchProps) => {
  return (
    <>
      <div className="divider" />
      <Link href={`/match/${id}`}>
        <div className="flex flex-col gap-y-2">
          <p className="text-center text-xl">{division}</p>
          <div className="mt-4 flex flex-row items-center justify-around">
            <div className="flex flex-col items-center gap-y-2">
              <Image
                src={`/team-logos/${homeLogo}.png`}
                alt={`${homeTeam} logo`}
                height={75}
                width={75}
              />
              <p className="text-center text-sm">{homeTeam}</p>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Image
                src={`/team-logos/${awayLogo}.png`}
                alt={`${awayTeam} logo`}
                height={75}
                width={75}
              />
              <p className="text-center text-sm">{awayTeam}</p>
            </div>
          </div>
          <p>
            Match{" "}
            {formatDistance(scheduledTime, new Date(), { addSuffix: true })} on{" "}
            {format(scheduledTime, "EEEE, LLLL d")}.
          </p>
        </div>
      </Link>
    </>
  );
};

const Welcome = () => {
  const { data, isLoading } = api.matches.getUpcomingUserMatches.useQuery();
  const { user, isSignedIn } = useUser();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
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
              The profile icon on the top right contains your navigation. This
              page will show your next two upcoming matches. Click on one to go
              to where you can generate lineup and final score graphics for
              Twitter.
            </p>
            <p>
              Please remember to copy and paste the provided alt text for
              Twitter to make the graphics accessible to those who need to use
              screen readers and other assisted technologies.
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
                  homeLogo={match.homeTeam.logo}
                  awayLogo={match.awayTeam.logo}
                />
              ))}
              <div className="divider" />
              <div className="card-actions flex-nowrap">
                <div className="w-1/2 shrink">
                  <Link href="/match">
                    <button className="btn-primary btn w-full text-primary-content">
                      View your matches
                    </button>
                  </Link>
                </div>
                <div className="w-1/2 shrink">
                  <Link href="/create">
                    <button className="btn-secondary btn w-full text-secondary-content">
                      Create a new match
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
