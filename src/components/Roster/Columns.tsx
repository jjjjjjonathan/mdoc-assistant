import type { ColumnDef } from "@tanstack/react-table";
import type { RosterPlayerType } from "~/server/api/routers/players";
import Toggle from "../Form/Toggle";
import TextInput from "../Form/TextInput";

export const createRosterColumns = (
  addToStartingXI: (id: number) => void,
  removeFromStartingXI: (id: number) => void
): ColumnDef<RosterPlayerType>[] => {
  const handleStarterChange = (
    isStarter: boolean,
    toggleSelected: (isSelected: boolean) => void,
    playerId: number
  ) => {
    if (isStarter) {
      addToStartingXI(playerId);
      toggleSelected(!!isStarter);
    } else {
      removeFromStartingXI(playerId);
      toggleSelected(!!isStarter);
    }
  };
  return [
    {
      id: "starter",
      accessorKey: "isStarter",
      header: "Starter",
      cell: ({ row }) => (
        <Toggle
          handleChange={handleStarterChange}
          toggleSelected={row.toggleSelected}
          playerId={row.original.id}
          checked={row.getIsSelected()}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        // const changeName = (name: string) => {
        //   // row.original.setName(name);
        //   console.log(row.original.setName);
        // };

        return (
          <span>
            {row.getIsSelected() ? (
              <TextInput
                placeholder="Type player's name"
                initialValue={row.getValue("name")}
                handleChange={undefined}
              />
            ) : (
              row.getValue("name")
            )}
          </span>
        );
      },
    },
    {
      accessorKey: "number",
      header: "Shirt Number",
    },
    {
      accessorKey: "isGoalkeeper",
      header: "Goalkeeper",
    },
    {
      accessorKey: "isCaptain",
      header: "Captain",
    },
  ];
};
