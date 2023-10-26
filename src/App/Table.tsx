import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Person } from "../types";
import { Box } from "@mui/material";
import { EMPLOYEE_TYPE, ROLES } from "../constants";
import { useGridState } from "../hooks/useGridState";

export default function Table() {
  const {
    items,
    loading,
    count,
    pageSize,
    rowSelectionModel,
    setRowSelectionModel,
    setPageSize,
    setOffset,
  } = useGridState();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 150, editable: true },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: [ROLES.STUDENT, ROLES.EMPLOYEE],
    },
    {
      field: "employeeType",
      headerName: "Employee Type",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: [EMPLOYEE_TYPE.FULL_TIME, EMPLOYEE_TYPE.PART_TIME],
    },
    { field: "email", headerName: "Email", width: 200 },
  ];

  return (
    <Box mb={10}>
      <DataGrid<Person>
        rows={items}
        columns={columns}
        isCellEditable={() => false}
        loading={loading}
        disableColumnFilter
        disableRowSelectionOnClick
        paginationMode="server"
        rowCount={count}
        initialState={{
          pagination: { paginationModel: { pageSize } },
        }}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={({ page, pageSize }) => {
          setPageSize(pageSize);
          setOffset(pageSize * page);
        }}
        checkboxSelection={true}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
      />
    </Box>
  );
}
