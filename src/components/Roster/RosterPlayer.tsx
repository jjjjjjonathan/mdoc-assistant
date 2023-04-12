import type { RosterPlayerType } from "~/server/api/routers/players";
import { useState } from "react";
import classNames from "classnames";

type RosterPlayerProps = {
  name: string;
  number: number;
  startingXI: RosterPlayerType[];
  addToStartingXI: (startingXI: RosterPlayerType[], id: number) => void;
  removeFromStartingXI: (id: number) => void;
  updateGoalkeeper: (id: number) => void;
  updateCaptain: (id: number) => void;
  id: number;
  changePlayerName: (id: number, name: string) => void;
  goalkeeper: number;
  changePlayerNumber: (id: number, newNumber: number) => void;
};

const RosterPlayer = ({
  name,
  number,
  startingXI,
  addToStartingXI,
  removeFromStartingXI,
  updateGoalkeeper,
  updateCaptain,
  changePlayerName,
  id,
  goalkeeper,
  changePlayerNumber,
}: RosterPlayerProps) => {
  const [selected, setSelected] = useState(false);

  const cardClasses = classNames("card w-full shadow-xl", {
    "bg-base-200 shadow-neutral-focus": selected,
  });

  const extraInfoClasses = classNames("card-actions flex-col", {
    invisible: !selected,
    visible: selected,
  });

  return (
    <div className={cardClasses}>
      <div className={classNames("card-body", { "pt-5": selected })}>
        {selected ? (
          <input
            className="input-ghost input card-title p-0 text-primary"
            type="text"
            defaultValue={name}
            onChange={(event) => {
              changePlayerName(id, event.target.value);
            }}
          />
        ) : (
          <h2 className="card-title">{name}</h2>
        )}
      </div>
      <div className="flex flex-row">
        <label htmlFor="">Starter?</label>

        <input
          className="toggle-primary toggle mx-2"
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
        <div className={extraInfoClasses}>
          <div className="flex flex-row">
            <label htmlFor="">Check if goalkeeper</label>
            <input
              name="gk-radio"
              className="radio-primary radio mx-2"
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
          </div>
          <div>
            <label htmlFor="">Shirt number:</label>
            <input
              type="text"
              className="input-bordered input-primary input mx-2 h-12 w-16 text-center"
              onChange={(e) => {
                const newNumber = parseInt(e.target.value, 10);
                changePlayerNumber(id, newNumber);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RosterPlayer;
