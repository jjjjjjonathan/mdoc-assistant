import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import EditMatchModal from "./Modal/EditMatch";
import DeleteMatchModal from "./Modal/DeleteMatch";

type MatchListItemProps = {
  homeTeam: {
    logo: string;
    name: string;
  };
  awayTeam: {
    logo: string;
    name: string;
  };
  scheduledTime: Date;
  division: string;
  id: number;
};

const MatchListItem = ({
  homeTeam,
  awayTeam,
  scheduledTime,
  division,
  id,
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
                  className="btn-warning btn-sm btn"
                  onClick={(event) => event.stopPropagation()}
                >
                  Edit
                </label>
                <label
                  htmlFor={`delete-modal-${id}`}
                  className="btn-error btn-sm btn"
                  onClick={(event) => event.stopPropagation()}
                >
                  Delete
                </label>
              </div>
              <div className="badge-outline badge">{division}</div>
            </div>
          </div>
        </div>
      </Link>
      <EditMatchModal id={id} />
      <DeleteMatchModal id={id} />
    </>
  );
};

export default MatchListItem;
