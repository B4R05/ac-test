import React, { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { queryApi } from "../api";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { EmployeeType, Person, PersonRole } from "../types";
import Table from "./Table";
import { Filter } from "./Filter";
import { useFilterState, useGridState, useUIState } from "../contexts";

function App() {
  const {
    rowSelectionModel,
    setRowSelectionModel,
    offset,
    pageSize,
    sort,
    sortDirection,
    setItems,
    setCount,
    setLoading,
  } = useGridState();

  const { search, role, employeeType } = useFilterState();

  const { showDrawer, errorMessage, setShowDrawer, setErrorMessage } =
    useUIState();

  useEffect(() => {
    setShowDrawer(rowSelectionModel.length > 0);
  }, [rowSelectionModel, setShowDrawer]);

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

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={errorMessage !== null}
          autoHideDuration={6000}
          onClose={() => setErrorMessage(null)}
          message={errorMessage}
        />

        <Box>
          <Typography variant="h4">Person Admin</Typography>
        </Box>

        <Filter />
        <Table />

        <Drawer
          anchor="bottom"
          open={showDrawer}
          onClose={setShowDrawer}
          hideBackdrop={true}
          variant="persistent"
        >
          <Box sx={{ bgcolor: "black", p: 4, color: "white" }}>
            <Button color="primary" onClick={() => setRowSelectionModel([])}>
              Export {rowSelectionModel.length} item(s) ➡️{" "}
            </Button>
          </Box>
        </Drawer>
      </Paper>
    </Container>
  );
}

export default App;
