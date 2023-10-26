import { useContext } from "react";
import { GridStateContext } from "../contexts";

export function useGridState() {
  const context = useContext(GridStateContext);
  if (!context) {
    throw new Error("useGridState must be used within a GridStateProvider");
  }
  return context;
}
