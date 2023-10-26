import { useEffect } from "react";
import { queryApi } from "../api";
import { EmployeeType, Person, PersonRole } from "../types";

type UseFetchDataProps = {
  search: string;
  role: string;
  employeeType: string;
  offset: number;
  pageSize: number;
  sort: keyof Person | null;
  sortDirection: "asc" | "desc" | null;
  setLoading: (value: boolean) => void;
  setItems: (items: any[]) => void;
  setCount: (count: number) => void;
  setErrorMessage: (message: string) => void;
};

function useFetchData(props: UseFetchDataProps) {
  const {
    search,
    role,
    employeeType,
    offset,
    pageSize,
    sort,
    sortDirection,
    setLoading,
    setItems,
    setCount,
    setErrorMessage,
  } = props;

  useEffect(() => {
    setLoading(true);
    queryApi(
      search,
      role as PersonRole,
      employeeType as EmployeeType,
      offset,
      pageSize,
      sort,
      sortDirection
    )
      .then(({ items, count }) => {
        setItems(items);
        setCount(count);
        setLoading(false);
      })
      .catch(() =>
        setErrorMessage("There has been an error loading from the API.")
      );
  }, [
    search,
    role,
    employeeType,
    offset,
    pageSize,
    sort,
    sortDirection,
    setLoading,
    setItems,
    setCount,
    setErrorMessage,
  ]);
}

export default useFetchData;
