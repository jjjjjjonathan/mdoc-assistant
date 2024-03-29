import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import EditMatchModal from "./Modal/EditMatch";
import DeleteMatchModal from "./Modal/DeleteMatch";

type MatchListItemProps = {
  isNeutral: boolean;
  isForChampionship: boolean;
  homeTeam: {
    logo: string;
    name: string;
    id: number;
  };
  awayTeam: {
    logo: string;
    name: string;
    id: number;
  };
  scheduledTime: Date;
  division: {
    name: string;
    id: number;
  };
  id: number;
  onDeleteMatch: (id: number) => void;
  e2eNumber: number;
  onEditMatch: (
    matchId: number,
    division: number,
    homeTeamId: number,
    awayTeamId: number,
    e2eNumber: number,
    scheduledTime: string,
    isNeutral: boolean,
    isForChampionship: boolean
  ) => void;
  divisionsAndTeams:
    | {
        teams: {
          id: number;
          name: string;
        }[];
        id: number;
        name: string;
      }[]
    | undefined;
};

const MatchListItem = ({
  homeTeam,
  awayTeam,
  scheduledTime,
  division,
  id,
  onDeleteMatch,
  e2eNumber,
  onEditMatch,
  divisionsAndTeams,
  isNeutral,
  isForChampionship,
}: MatchListItemProps) => {
  return (
    <>
      <Link href={`/match/${id}`}>
        <div className="card h-full w-full bg-neutral shadow-xl">
          <div className="flex flex-row items-center justify-around p-4">
            <div className="flex flex-col items-center gap-y-2">
              <Image
                src={`/team-logos/${homeTeam.logo}.png`}
                alt={homeTeam.name}
                width={100}
                height={100}
              />
              <p className="text-sm">{homeTeam.name}</p>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <Image
                src={`/team-logos/${awayTeam.logo}.png`}
                alt={awayTeam.name}
                width={100}
                height={100}
              />
              <p className="text-sm">{awayTeam.name}</p>
            </div>
          </div>

          <div className="card-body">
            <h2 className="card-title text-lg">
              {homeTeam.name} vs. {awayTeam.name}
            </h2>
            <p>
              Match{" "}
              {formatDistance(scheduledTime, new Date(), { addSuffix: true })}
            </p>
            <div className="card-actions mt-6 items-center justify-between">
              <div className="flex flex-row gap-x-2">
                <label
                  htmlFor={`edit-modal-${id}`}
                  className="btn-warning btn-sm btn text-warning-content hover:bg-warning-content hover:text-warning"
                  onClick={(event) => event.stopPropagation()}
                >
                  Edit
                </label>
                <label
                  htmlFor={`delete-modal-${id}`}
                  className="btn-error btn-sm btn text-error-content hover:bg-error-content hover:text-error"
                  onClick={(event) => event.stopPropagation()}
                >
                  Delete
                </label>
              </div>
              <div className="badge-outline badge">{division.name}</div>
            </div>
          </div>
        </div>
      </Link>
      <EditMatchModal
        matchId={id}
        divisionId={division.id}
        homeTeamId={homeTeam.id}
        awayTeamId={awayTeam.id}
        e2e={e2eNumber.toString(10)}
        scheduledTimeDate={scheduledTime}
        onEditMatch={onEditMatch}
        divisionsAndTeams={divisionsAndTeams}
        isNeutralMatch={isNeutral}
        isChampionshipMatch={isForChampionship}
      />
      <DeleteMatchModal
        id={id}
        onDeleteMatch={onDeleteMatch}
        homeTeam={homeTeam.name}
        awayTeam={awayTeam.name}
      />
    </>
  );
};

export default MatchListItem;
