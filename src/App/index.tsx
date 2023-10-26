import { useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Drawer,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import Table from "./Table";
import { Filter } from "./Filter";
import { updateQueryString } from "../utils";
import useFetchData from "../hooks/useFetchData";
import { useGridState } from "../hooks/useGridState";
import { useFilterState } from "../hooks/useFilterState";
import { useUIState } from "../hooks/useUIState";

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

  const filterState = useFilterState();
  const { showDrawer, errorMessage, setShowDrawer, setErrorMessage } =
    useUIState();

  useEffect(() => {
    const gridState = {
      offset,
      pageSize,
      sort,
      sortDirection,
    };
    updateQueryString(filterState, gridState);
  }, [offset, pageSize, sort, sortDirection, filterState]);

  useEffect(() => {
    setShowDrawer(rowSelectionModel.length > 0);
  }, [rowSelectionModel, setShowDrawer]);

  useFetchData({
    ...filterState,
    offset,
    pageSize,
    sort,
    sortDirection,
    setLoading,
    setItems,
    setCount,
    setErrorMessage,
  });

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
