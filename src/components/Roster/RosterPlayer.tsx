import type { RosterPlayerType } from "~/server/api/routers/players";
import { useState } from "react";
import classNames from "classnames";

type RosterPlayerProps = {
  name: string;
  startingXI: RosterPlayerType[];
  addToStartingXI: (startingXI: RosterPlayerType[], id: number) => void;
  removeFromStartingXI: (id: number) => void;
  updateGoalkeeper: (id: number) => void;
  updateCaptain: (id: number) => void;
  id: number;
  changePlayerName: (id: number, name: string) => void;
  goalkeeper: number;
  changePlayerNumber: (id: number, newNumber: number) => void;
  captain: number;
};

const RosterPlayer = ({
  name,
  startingXI,
  addToStartingXI,
  removeFromStartingXI,
  updateGoalkeeper,
  updateCaptain,
  changePlayerName,
  id,
  goalkeeper,
  changePlayerNumber,
  captain,
}: RosterPlayerProps) => {
  const [selected, setSelected] = useState(false);

  const cardClasses = classNames("card w-full bg-neutral", {
    hidden: startingXI.length >= 11 && !selected,
  });

  return (
    <div className={cardClasses}>
      <div className="card-body">
        {selected ? (
          <input
            className="input-bordered input-ghost input h-12"
            type="text"
            defaultValue={name}
            onChange={(event) => {
              changePlayerName(id, event.target.value);
            }}
          />
        ) : (
          <h2 className="card-title h-12 sm:w-96">{name}</h2>
        )}
      </div>
      <div className="mx-auto grid grid-cols-2 gap-4 pb-6">
        <label htmlFor="" className="place-self-end self-center">
          Starter:
        </label>

        <input
          className="toggle-primary toggle place-self-center"
          disabled={
            startingXI.filter((player) => player.id === id).length <= 0 &&
            startingXI.length >= 11
          }
          type="checkbox"
          value={id}
          onChange={(event) => {
            const clickedId = parseInt(event.target.value, 10);
            if (
              event.target.checked &&
              startingXI.filter((player) => player.id === clickedId).length <= 0
            ) {
              addToStartingXI(startingXI, clickedId);
              setSelected(true);
            }
            if (
              !event.target.checked &&
              startingXI.filter((player) => player.id === clickedId).length > 0
            ) {
              removeFromStartingXI(clickedId);
              setSelected(false);
            }
          }}
        />
        <label htmlFor="" className="place-self-end self-center">
          Goalkeeper:
        </label>
        <input
          disabled={!selected}
          name="gk-radio"
          className="radio-secondary radio place-self-center"
          type="radio"
          value={id}
          onChange={(event) => {
            const clickedId = parseInt(event.target.value, 10);
            if (event.target.checked && goalkeeper !== clickedId) {
              updateGoalkeeper(clickedId);
            }
            if (!event.target.checked && goalkeeper === clickedId) {
              updateGoalkeeper(-1);
            }
          }}
        />
        <label htmlFor="" className="place-self-end self-center">
          Captain:
        </label>
        <input
          disabled={!selected}
          name="captain-radio"
          className="radio-accent radio place-self-center"
          type="radio"
          value={id}
          onChange={(event) => {
            const clickedId = parseInt(event.target.value, 10);
            if (event.target.checked && captain !== clickedId) {
              updateCaptain(clickedId);
            }
            if (!event.target.checked && captain === clickedId) {
              updateCaptain(-1);
            }
          }}
        />
        <label htmlFor="" className="place-self-end self-center">
          Shirt number:
        </label>
        <input
          disabled={!selected}
          type="text"
          className="input-bordered input-info input h-12 w-16 place-self-center text-center"
          onChange={(e) => {
            const newNumber = parseInt(e.target.value, 10);
            changePlayerNumber(id, newNumber);
          }}
        />
      </div>
    </div>
  );
};

export default RosterPlayer;
