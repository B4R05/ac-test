import { GridRowSelectionModel } from "@mui/x-data-grid";
import React, {
  useState,
  createContext,
  useContext,
  SetStateAction,
  Dispatch,
  ReactElement,
} from "react";
import { Person, PersonRole } from "../types";

type FilterStateType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  role: PersonRole | string;
  setRole: Dispatch<SetStateAction<string>>;
  employeeType: string;
  setEmployeeType: Dispatch<SetStateAction<string>>;
};

const FilterStateContext = createContext<FilterStateType | undefined>(
  undefined
);

export function useFilterState() {
  const context = useContext(FilterStateContext);
  if (!context) {
    throw new Error("useFilterState must be used within a FilterStateProvider");
  }
  return context;
}

export function FilterStateProvider({ children }: { children: ReactElement }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ANY");
  const [employeeType, setEmployeeType] = useState("ANY");

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

type GridStateType = {
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

const GridStateContext = createContext<GridStateType | undefined>(undefined);

export function useGridState() {
  const context = useContext(GridStateContext);
  if (!context) {
    throw new Error("useGridState must be used within a GridStateProvider");
  }
  return context;
}

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

type UIStateType = {
  showDrawer: boolean;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  errorMessage: string | null;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
};

const UIStateContext = createContext<UIStateType | undefined>(undefined);

export function useUIState() {
  const context = useContext(UIStateContext);
  if (!context) {
    throw new Error("useUIState must be used within a UIStateProvider");
  }
  return context;
}

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
