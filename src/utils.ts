import { FilterStateType, GridStateType } from "./contexts/types";

export const updateQueryString = (
  filterState: Pick<FilterStateType, "search" | "role" | "employeeType">,
  gridState: Pick<
    GridStateType,
    "offset" | "pageSize" | "sort" | "sortDirection"
  >
) => {
  const params = new URLSearchParams();

  const combinedState = { ...filterState, ...gridState };

  Object.entries(combinedState).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value as string);
    }
  });

  window.history.pushState({}, "", `?${params.toString()}`);
};
