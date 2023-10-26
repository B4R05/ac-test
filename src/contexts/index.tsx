import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useState, createContext, ReactElement } from "react";
import { DEFAULT_SEARCH, EMPLOYEE_TYPE, ROLES } from "../constants";
import { Person } from "../types";
import { FilterStateType, GridStateType, UIStateType } from "./types";

export const FilterStateContext = createContext<FilterStateType | undefined>(
  undefined
);

export function FilterStateProvider({ children }: { children: ReactElement }) {
  const params = new URLSearchParams(window.location.search);

  const initialSearch = params.get("search") || DEFAULT_SEARCH;
  const initialRole = params.get("role") || ROLES.ANY;
  const initialEmployeeType = params.get("employeeType") || EMPLOYEE_TYPE.ANY;

  const [search, setSearch] = useState(initialSearch);
  const [role, setRole] = useState(initialRole);
  const [employeeType, setEmployeeType] = useState(initialEmployeeType);

  return (
    <FilterStateContext.Provider
      value={{
        search,
        setSearch,
        role,
        setRole,
        employeeType,
        setEmployeeType,
      }}
    >
      {children}
    </FilterStateContext.Provider>
  );
}

export const GridStateContext = createContext<GridStateType | undefined>(
  undefined
);

export function GridStateProvider({ children }: { children: ReactElement }) {
  const [items, setItems] = useState<Person[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<keyof Person | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  return (
    <GridStateContext.Provider
      value={{
        items,
        setItems,
        count,
        setCount,
        loading,
        setLoading,
        pageSize,
        setPageSize,
        offset,
        setOffset,
        sort,
        setSort,
        sortDirection,
        setSortDirection,
        rowSelectionModel,
        setRowSelectionModel,
      }}
    >
      {children}
    </GridStateContext.Provider>
  );
}

export const UIStateContext = createContext<UIStateType | undefined>(undefined);

export function UIStateProvider({ children }: { children: ReactElement }) {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <UIStateContext.Provider
      value={{ showDrawer, setShowDrawer, errorMessage, setErrorMessage }}
    >
      {children}
    </UIStateContext.Provider>
  );
}
