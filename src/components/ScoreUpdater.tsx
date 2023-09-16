type Props = {
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  handleScoreDecrease: (team: "home" | "away") => void;
  handleScoreIncrease: (team: "home" | "away") => void;
};

const ScoreUpdater = ({
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
  handleScoreDecrease,
  handleScoreIncrease,
}: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
        <p>Score for {homeTeamName}:</p>
        <div className="flex flex-row items-center gap-x-4">
          <button
            className="btn-secondary btn"
            onClick={() => handleScoreDecrease("home")}
            disabled={homeScore <= 0}
          >
            -1
          </button>
          <p>{homeScore}</p>
          <button
            className="btn-accent btn"
            onClick={() => handleScoreIncrease("home")}
          >
            +1
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between text-lg sm:flex-row md:flex-col xl:flex-row">
        <p>Score for {awayTeamName}:</p>
        <div className="flex flex-row items-center gap-x-4">
          <button
            className="btn-secondary btn"
            onClick={() => handleScoreDecrease("away")}
            disabled={awayScore <= 0}
          >
            -1
          </button>
          <p>{awayScore}</p>
          <button
            className="btn-accent btn"
            onClick={() => handleScoreIncrease("away")}
          >
            +1
          </button>
        </div>
      </div>
    </>
  );
};

export default ScoreUpdater;
