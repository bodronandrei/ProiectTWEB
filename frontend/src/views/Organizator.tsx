import { ChangeEvent, useEffect, useState } from "react";
import { get, remove } from "../api/Calls";
import { Organizator } from "../models/Organizator";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "../components/TablePaginationActions";
import { PaginationResponse } from "../models/PaginationResponse";
import { Box, Button, TableHead, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { organizatorFilterDto } from "../models/organizatorFilterDto";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import _ from "lodash";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

export default function OrganizatorList() {

  const [organizator, setOrganizator] = useState<PaginationResponse<Organizator>>({ count: 0, rows: [] })
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0)
  const [organizatorFilter, setOrganizatorFilter] = useState<organizatorFilterDto>({
    organizatorName: "",
    organizatorSurname: "",
    take: 5,
    skip: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizator(organizatorFilter).then(d => { setOrganizator(d); })
  }, )

  async function getOrganizator(organizatorFilter: organizatorFilterDto) {
    return (await get("/organizator/organizator", organizatorFilter)) as PaginationResponse<Organizator>;
  }

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    let newFilter = _.cloneDeep(organizatorFilter);
    newFilter.skip = newPage;
    await filter(newFilter);
    setOrganizatorFilter(newFilter);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let take = parseInt(event.target.value, 10)
    setRowsPerPage(take);
    setPage(0);

    let newFilter = _.cloneDeep(organizatorFilter);
    newFilter.take = take;
    newFilter.skip = 0;
    await filter(newFilter);
    setOrganizatorFilter(newFilter);
  };

  function newConferinta() {
    navigate("/NewConferinta")
  }
  function newReviewer() {
    navigate("/NewReviewer")
  }


  function onChangeFilter(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setOrganizatorFilter({ ...organizatorFilter, [e.target.name]: e.target.value });
  }

  async function filterOrganizator() {
    setPage(0)
    let orgFilter = _.cloneDeep(organizatorFilter);
    orgFilter.skip = 0
    filter(orgFilter)
  }

  async function clearFilters() {
    let newFilter = { organizatorName: "", organizatorSurname: "", skip: 0, take: 5 };
    setPage(0)
    setRowsPerPage(5);
    setOrganizatorFilter(newFilter);
    filter(newFilter)
  }

  async function filter(filter: organizatorFilterDto) {
    let filterOrganizator = await getOrganizator(filter);
    setOrganizator(filterOrganizator);
  }

  async function deleteOrganizator(organizatorId: number){
    await remove("/organizator/organizator", organizatorId);
    let ret = await getOrganizator(organizatorFilter);
    setOrganizator(ret);
  }

  async function editOrganizator(organizatorId: number){
    navigate(`/EditOrganizator/${organizatorId}`);
  }

  return (
    <div>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        style={{ marginBottom: '30px' }}
      >

        <h1>Filters</h1>
        <div>

          <TextField
            label="Numele organizatorului:"
            value={organizatorFilter.organizatorName}
            onChange={onChangeFilter}
            name="organizatorName"
          />

          <TextField
            label="Prenumele organizatorului:"
            value={organizatorFilter.organizatorSurname}
            onChange={onChangeFilter}
            name="organizatorSurname"
          />

        </div>

        <div>
          <Button
            style={{ marginRight: "8px" }}
            startIcon={<FilterAltIcon />}
            variant="contained"
            onClick={filterOrganizator}
            sx={{
              backgroundColor: "#9370DB", 
              borderRadius: "20px", 
              minWidth: "100px", 
              padding: "10px 20px", 
              "&:hover": {
                backgroundColor: "#8A2BE2", 
              },
            }}
          >
            Filter
          </Button>

          <Button
            startIcon={<ClearIcon />}
            variant="contained"
            onClick={clearFilters}
            sx={{
              backgroundColor: "#FF6347", 
              borderRadius: "20px", 
              minWidth: "100px", 
              padding: "10px 20px", 
              "&:hover": {
                backgroundColor: "#FF4500", 
              },
            }}
          >
            Clear Filters
          </Button>
        </div>

      </Box>

      <div>
  <Button
    style={{ marginBottom: '20px', marginRight: '10px' }}
    startIcon={<AddCircleIcon />}
    variant="contained"
    onClick={newConferinta}
    sx={{
      backgroundColor: "#800080", 
      borderRadius: "20px",
      minWidth: "150px", 
      padding: "10px 20px",
      '&:hover': {
        backgroundColor: "#4B0082", 
      },
    }}
  >
    Creeaza conferinta!
  </Button>

  <Button
    style={{ marginBottom: '20px' }}
    startIcon={<AddCircleIcon />}
    variant="contained"
    onClick={newReviewer}
    sx={{
      backgroundColor: "#800080", 
      borderRadius: "20px",
      minWidth: "150px", 
      padding: "10px 20px",
      '&:hover': {
        backgroundColor: "#4B0082", 
      },
    }}
  >
    Adauga reviewer!
  </Button>
</div>

      <Box sx={{ backgroundColor:'lavender', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
        <Typography variant="subtitle1" sx={{ textAlign: 'left', fontStyle: 'italic', fontWeight: 'bold', color: 'purple' }}>
          Lista organizatorilor
        </Typography>
      </Box>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Numele Organizatorului </TableCell>
              <TableCell>Prenumele Organizatorului</TableCell>

              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizator.rows.map((row) => (
              <TableRow key={row.OrganizatorId}>
                <TableCell align="left">
                  {row.OrganizatorName}
                </TableCell>
                <TableCell align="left">
                  {row.OrganizatorSurName}
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    color="success"
                    onClick={() => editOrganizator(row.OrganizatorId)}
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    startIcon={<CancelIcon />}
                    color="error"
                    onClick={() => deleteOrganizator(row.OrganizatorId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={organizator.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}