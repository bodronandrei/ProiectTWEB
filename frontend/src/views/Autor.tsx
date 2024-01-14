import { ChangeEvent, useEffect, useState } from "react";
import { get, remove } from "../api/Calls";
import { Autor } from "../models/Autor";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "../components/TablePaginationActions";
import { PaginationResponse } from "../models/PaginationResponse";
import { Box, Button, TableHead, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { autorFilterDto } from "../models/autorFilterDto";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { Label } from "@mui/icons-material";

export default function AutorsList() {
  const [autors, setAutors] = useState<PaginationResponse<Autor>>({
    count: 0,
    rows: [],
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [autorFilter, setAutorFilter] = useState<autorFilterDto>({
    autorName: "",
    autorSurname: "",
    take: 5,
    skip: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAutors(autorFilter).then((d) => {
      setAutors(d);
    });
  }, []);

  async function getAutors(autorFilter: autorFilterDto) {
    return (await get("/autor/autor", autorFilter)) as PaginationResponse<Autor>;
  }

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    let newFilter = _.cloneDeep(autorFilter);
    newFilter.skip = newPage;
    await filter(newFilter);
    setAutorFilter(newFilter);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let take = parseInt(event.target.value, 10);
    setRowsPerPage(take);
    setPage(0);

    let newFilter = _.cloneDeep(autorFilter);
    newFilter.take = take;
    newFilter.skip = 0;
    await filter(newFilter);
    setAutorFilter(newFilter);
  };

  function newArticol() {
    navigate("/NewArticol");
  }

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setAutorFilter({ ...autorFilter, [e.target.name]: e.target.value });
  }

  async function filterAutor() {
    setPage(0);
    let autFilter = _.cloneDeep(autorFilter);
    autFilter.skip = 0;
    filter(autFilter);
  }

  async function clearFilters() {
    let newFilter = { autorName: "", autorSurname: "", skip: 0, take: 5 };
    setPage(0);
    setRowsPerPage(5);
    setAutorFilter(newFilter);
    filter(newFilter);
  }

  async function filter(filter: autorFilterDto) {
    let filterAutor = await getAutors(filter);
    setAutors(filterAutor);
  }

  async function deleteAutor(autorId: number) {
    await remove("/autor/autor", autorId);
    let ret = await getAutors(autorFilter);
    setAutors(ret);
  }

  async function editAutor(autorId: number) {
    navigate(`/EditAutor/${autorId}`);
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        style={{ marginBottom: "30px" }}
      >
        <h1>Filters</h1>
        <div>
          <TextField
            label="Numele autorului:"
            value={autorFilter.autorName}
            onChange={onChangeFilter}
            name="autorName"
          />

          <TextField
            label="Prenumele autorului:"
            value={autorFilter.autorSurname}
            onChange={onChangeFilter}
            name="autorSurname"
          />
        </div>

        
        <div>
          <Button
            style={{ marginRight: "8px" }}
            startIcon={<FilterAltIcon />}
            variant="contained"
            onClick={filterAutor}
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

      <Button
    style={{ marginBottom: "20px" }}
    startIcon={<AddCircleIcon />}
    variant="contained"
    onClick={newArticol}
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
    Adauga articol!
  </Button>

      <Box
        sx={{
          backgroundColor: "lavender",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: "left",
            fontStyle: "italic",
            fontWeight: "bold",
            color: "purple",
          }}
        >
          Lista autorilor
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Numele autorului</TableCell>
              <TableCell>Prenumele autorului</TableCell>
              <TableCell>Conferinta la care participa</TableCell>
              <TableCell>Articolul postat</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {autors.rows.map((row) => (
              <TableRow key={row.AutorId}>
                <TableCell align="left">{row.AutorName}</TableCell>
                <TableCell align="left">{row.AutorSurname}</TableCell>
                <TableCell align="left">{row.ConferintaId}</TableCell>

                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    color="success"
                    onClick={() => editAutor(row.AutorId)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<CancelIcon />}
                    color="error"
                    onClick={() => deleteAutor(row.AutorId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={autors.count}
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
