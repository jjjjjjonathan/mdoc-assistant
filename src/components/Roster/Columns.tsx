import type { ColumnDef } from "@tanstack/react-table";
import type { RosterPlayerType } from "~/server/api/routers/players";
import Toggle from "../Form/Toggle";

export const createRosterColumns = (
  addToStartingXI: (id: number) => void,
  removeFromStartingXI: (id: number) => void
): ColumnDef<RosterPlayerType>[] => {
  const handleStarterChange = (
    isStarter: boolean,
    toggleSelected: (isSelected: boolean) => void,
    playerId: number
  ) => {
    console.log("just outside of if statement");
    if (isStarter) {
      console.log("isStarter is true", isStarter);
      addToStartingXI(playerId);
      toggleSelected(!!isStarter);
    } else {
      console.log("isStarter is false");
      removeFromStartingXI(playerId);
      toggleSelected(!!isStarter);
    }
  };
  return [
    {
      id: "id",
      accessorKey: "id",
    },
    {
      id: "starter",
      accessorKey: "isStarter",
      header: "Starter",
      cell: ({ row }) => (
        <Toggle
          handleChange={handleStarterChange}
          toggleSelected={row.toggleSelected}
          playerId={row.getValue("id")}
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span>{row.getIsSelected() ? "SELECTED" : row.getValue("name")}</span>
      ),
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
