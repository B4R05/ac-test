import { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { EmployeeType, PersonRole } from "../types";
import { DEFAULT_SEARCH, EMPLOYEE_TYPE, ROLES } from "../constants";
import { useFilterState } from "../hooks/useFilterState";

export function Filter() {
  const { search, setSearch, role, setRole, employeeType, setEmployeeType } =
    useFilterState();

  useEffect(() => {
    if (role !== ROLES.EMPLOYEE) {
      setEmployeeType(EMPLOYEE_TYPE.ANY);
    }
  }, [role, setEmployeeType]);

  const onReset = () => {
    setSearch(DEFAULT_SEARCH);
    setRole(ROLES.ANY);
    setEmployeeType(EMPLOYEE_TYPE.ANY);
  };

  return (
    <Box my={4}>
      <Typography variant="h5">Search Filter</Typography>
      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <TextField
          name="search"
          label="Search"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select<PersonRole>
            labelId="role-label"
            id="role"
            name="role"
            label="Role"
            onChange={(e) => setRole(e.target.value)}
            value={role as PersonRole}
          >
            <MenuItem value={ROLES.ANY}>Any</MenuItem>
            <MenuItem value={ROLES.STUDENT}>Student</MenuItem>
            <MenuItem value={ROLES.EMPLOYEE}>Employee</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="employee-label">Employee Type</InputLabel>
          <Select<EmployeeType>
            labelId="employee-label"
            id="employee"
            name="employee"
            label="Employee Type"
            onChange={(e) => setEmployeeType(e.target.value)}
            value={employeeType as EmployeeType}
            disabled={role === ROLES.STUDENT}
          >
            <MenuItem value={EMPLOYEE_TYPE.ANY}>Any</MenuItem>
            <MenuItem value={EMPLOYEE_TYPE.FULL_TIME}>Full-Time</MenuItem>
            <MenuItem value={EMPLOYEE_TYPE.PART_TIME}>Part-Time</MenuItem>
          </Select>
        </FormControl>

        <Button onClick={onReset}>Reset</Button>
      </Stack>
    </Box>
  );
}
