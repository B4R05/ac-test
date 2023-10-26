import { GridRowSelectionModel } from "@mui/x-data-grid";
import { SetStateAction, Dispatch } from "react";
import { Person, PersonRole } from "../types";

export type FilterStateType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  role: PersonRole | string;
  setRole: Dispatch<SetStateAction<string>>;
  employeeType: string;
  setEmployeeType: Dispatch<SetStateAction<string>>;
};

export type GridStateType = {
  items: Person[];
  setItems: Dispatch<SetStateAction<Person[]>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  offset: number;
  setOffset: Dispatch<SetStateAction<number>>;
  sort: keyof Person | null;
  setSort: Dispatch<SetStateAction<keyof Person | null>>;
  sortDirection: "asc" | "desc" | null;
  setSortDirection: Dispatch<SetStateAction<"asc" | "desc" | null>>;
  rowSelectionModel: GridRowSelectionModel;
  setRowSelectionModel: Dispatch<SetStateAction<GridRowSelectionModel>>;
};

export type UIStateType = {
  showDrawer: boolean;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};
