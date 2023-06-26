import type { RosterPlayerType } from "~/server/api/routers/players";
import { useState } from "react";
import TextInput from "../Form/TextInput";
import NumberInput from "../Form/NumberInput";
import Checkbox from "../Form/Checkbox";

type TableProps = {
  data: RosterPlayerType[] | undefined;
  startingLineup: RosterPlayerType[];
  actions: {
    addToStartingLineup(player: RosterPlayerType): void;
    removeFromStartingLineup(playerId: number): void;
    setGoalkeeper: (playerId: number) => void;
    setCaptain: (playerId: number) => void;
    updateNumber: (playerId: number, shirtNumber: number) => void;
    updateName: (playerId: number, playerName: string) => void;
  };
};

type TableRowProps = {
  player: RosterPlayerType;
  actions: TableProps["actions"];
  isSelected: boolean;
};

const TableRow = ({ player, actions, isSelected }: TableRowProps) => {
  const [selected, setSelected] = useState(isSelected);
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="toggle-primary toggle"
          checked={selected}
          onChange={(event) => {
            !!event.target.checked
              ? actions.addToStartingLineup(player)
              : actions.removeFromStartingLineup(player.id);
            setSelected(!!event.target.checked);
          }}
        />
      </td>
      <td>
        {!!selected ? (
          <TextInput
            initialValue={player.name}
            handleChange={undefined}
            handleNameChange={actions.updateName}
            placeholder="Type player's name here"
            playerId={player.id}
          />
        ) : (
          player.name
        )}
      </td>
      <td>
        {!!selected ? (
          <NumberInput
            initialValue={player.number}
            placeholder="Type shirt number"
            handleChange={undefined}
            handleShirtNumberChange={actions.updateNumber}
            playerId={player.id}
          />
        ) : null}
      </td>
      <td>
        {!!selected ? (
          <Checkbox
            initialValue={player.isGoalkeeper}
            playerId={player.id}
            handleChange={actions.setGoalkeeper}
            borderColor="checkbox-secondary"
          />
        ) : null}
      </td>
      <td>
        {!!selected ? (
          <Checkbox
            initialValue={player.isCaptain}
            playerId={player.id}
            handleChange={actions.setCaptain}
            borderColor="checkbox-accent"
          />
        ) : null}
      </td>
    </tr>
  );
};

const Table = ({ data, actions, startingLineup }: TableProps) => {
  const mappedRoster = data?.map((player) => (
    <TableRow
      key={player.id}
      player={player}
      actions={actions}
      isSelected={
        startingLineup.filter((starter) => starter.id === player.id).length ===
        1
      }
    />
  ));

  const mappedLineup = startingLineup.map((player) => (
    <TableRow
      key={player.id}
      player={player}
      actions={actions}
      isSelected={
        startingLineup.filter((starter) => starter.id === player.id).length ===
        1
      }
    />
  ));

  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>Starter</th>
            <th>Name</th>
            <th>Shirt Number</th>
            <th>Goalkeeper</th>
            <th>Captain</th>
          </tr>
        </thead>
        <tbody>
          {startingLineup.length === 11 ? mappedLineup : mappedRoster}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
